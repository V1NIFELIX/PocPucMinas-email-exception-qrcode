import { SendGridService } from '@anchan828/nest-sendgrid';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Mensagem } from './interfaces/mensagem.interface';
import { TemplateEmail } from './templates/templateEmail';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly sendGrid: SendGridService,
    @Inject('TemplateEmail') private readonly templateEmail: TemplateEmail,
  ) {}

  public async checkAndNotifyError(mensagem: Mensagem) {
    const { error, user, chave } = mensagem;
    const mensagemErro = `${error}. \n Chave: ${chave} \n <strong>Verifique se a chave está correta ou entre em contato com o suporte.</strong>`;
    const html = this.templateEmail.generateTemplateError(mensagemErro);
    const emailEnviado = await this.sendEmail(
      user,
      'sorteio@redemultimarket.com.br',
      'Nota Inelegível',
      html,
    );
    this.logger.log(emailEnviado);
    return emailEnviado;
  }

  public async sendEmail(to, from, subject, html) {
    try {
      return await this.sendGrid.send({
        to,
        from,
        subject,
        html,
      });
    } catch (error) {
      this.logger.error(
        `Nao foi possivel enviar o email. Error: ${JSON.stringify(error)}`,
      );
    }
  }
}
