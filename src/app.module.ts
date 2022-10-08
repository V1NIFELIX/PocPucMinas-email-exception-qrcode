import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateEmail } from './templates/templateEmail';
import { RestGateway } from 'src/Gateway/rest-gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apikey: configService.get<string>('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'TemplateEmail', useClass: TemplateEmail },
    { provide: 'IRestGateway', useClass: RestGateway },
  ],
})
export class AppModule {}
