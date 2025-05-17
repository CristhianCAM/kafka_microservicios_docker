import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOG_SERVICE', // Cliente para enviar logs
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-service-log-producer',
            brokers: ['broker:29092'],
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}