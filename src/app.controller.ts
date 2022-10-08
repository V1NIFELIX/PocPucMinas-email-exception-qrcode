import { Controller, Get, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IRestGateway } from './interfaces/i-rest-gateway.interface';
import { Mensagem } from './interfaces/mensagem.interface';

@Controller()
@Injectable()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    @Inject('IRestGateway') private readonly restGateway: IRestGateway,
  ) {}

  async delay(ms: number) {
    return await new Promise((r) => {
      setTimeout(r, ms);
    });
  }

  @EventPattern('error_consultar_nfe')
  async errorConsultarNfe(
    @Payload() mensagem: Mensagem,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      mensagem = JSON.parse(originalMsg.content.toString());

      this.logger.log('Mensagem recebida: ', mensagem);

      if (
        mensagem.error.includes('Execution context was destroyed') ||
        mensagem.error.includes('destroyed') ||
        mensagem.error.includes('ERR_CONNECTION_RESET') ||
        mensagem.error.includes('ERR_CONNECTION_TIMED_OUT') ||
        mensagem.error.includes('ERR_CONNECTION') ||
        mensagem.error.includes('ERR_NAME_NOT_RESOLVED') ||
        mensagem.error.includes('ERR') ||
        mensagem.error.includes('TypeError') ||
        mensagem.error.includes('Navigation failed because') ||
        mensagem.error.includes('failed') ||
        mensagem.error.includes('Protocol') ||
        mensagem.error.includes('error') ||
        mensagem.error.includes('UnknownError') ||
        mensagem.error.includes('InternalError') ||
        mensagem.error.includes('BadResponse') ||
        mensagem.error.includes('FailedPrecondition') ||
        mensagem.error.includes('ResourceExhausted') ||
        mensagem.error.includes('timeout')
      ) {
        mensagem.pattern = 'consultar_nfe';

        await channel.sendToQueue(
          this.configService.get<string>('RABBITMQ_PRODUCER_REQUEUE_NAME'),
          Buffer.from(JSON.stringify(mensagem)),
        );
        await this.delay(4000);
        await this.restGateway.Post(
          this.configService.get<string>('DISCORD_API_KEY'),
          {
            content: `Mensagem enviada para REQUEUE NFE:  ${JSON.stringify(
              mensagem,
            )} `,
          },
        );
      } else {
        await this.appService.checkAndNotifyError(mensagem);
        await this.delay(4000);
        await this.restGateway.Post(
          this.configService.get<string>('DISCORD_API_KEY'),
          { content: `Usuario notificado:  ${JSON.stringify(mensagem)} ` },
        );
      }
    } catch (error) {
      this.logger.error(
        '**** ERROR AO CONSULTAR NOTA FISCAL PELO QRCODE: ',
        error,
      );
      await this.delay(4000);
      await this.restGateway.Post(
        this.configService.get<string>('DISCORD_API_KEY'),
        {
          content: ` ERRO AO CONSULTAR NOTA FISCAL:  ${JSON.stringify(
            mensagem,
          )} `,
        },
      );
    } finally {
      const payloadGerarCupom = {
        ...mensagem,
        pattern: 'erro_qrcode_da_semana',
      };
      await channel.sendToQueue(
        this.configService.get<string>('RABBITMQ_PRODUCER_QUEUE_NAME'),
        Buffer.from(JSON.stringify(payloadGerarCupom)),
      );
      await channel.ack(originalMsg);
    }
  }
}
