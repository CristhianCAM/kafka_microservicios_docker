import { Controller, Get, Param, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, ClientKafka } from '@nestjs/microservices';

interface User {
  id: string;
  username: string;
  email: string;
}

const users: Record<string, User> = {};

@Controller()
export class AppController {
  constructor(@Inject('LOG_SERVICE') private readonly logClient: ClientKafka) {}

  @EventPattern('user.created')
  handleUserCreated(data: User) {
    users[data.id] = data;
    console.log('User Created Event Received:', data);
  }

  @MessagePattern('user.get')
  handleGetUser(id: string): User | undefined {
    console.log('Get User Request Received for ID:', id);
    this.logClient.emit('log.info', { // Enviar log al obtener usuario
      timestamp: new Date().toISOString(),
      service: 'user-service',
      message: `User requested with ID: ${id}`,
    });
    return users[id];
  }
}