import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-service', // Identificador único para este servicio
        brokers: ['broker:29092'],
      },
      consumer: {
        groupId: 'user-consumer-group', // Identificador del grupo de consumidores
      },
    },
  });
  await app.listen();
  console.log('User Service is listening...');
}
bootstrap();
