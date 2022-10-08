import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as momentTimezone from 'moment-timezone';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${configService.get<string>(
            'RABBITMQ_USER',
          )}:${configService.get<string>(
            'RABBITMQ_PASSWORD',
          )}@${configService.get<string>('RABBITMQ_HOST')}`,
        ],
        noAck: false,
        prefetchCount: 1,
        queue: configService.get<string>('RABBITMQ_CONSUMER_QUEUE_NAME'),
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.listen();

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };
}
bootstrap();
