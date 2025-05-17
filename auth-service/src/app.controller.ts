import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

interface CreateUserPayload {
  username: string;
  email: string;
}

@Controller()
export class AppController {
  constructor(@Inject('LOG_SERVICE') private readonly logClient: ClientKafka) {}

  @Post('register')
  async registerUser(@Body() payload: CreateUserPayload) {
    const userId = uuidv4();
    const user = { id: userId, ...payload };

    this.logClient.emit('user.created', user);

    this.logClient.emit('log.info', {
      timestamp: new Date().toISOString(),
      service: 'auth-service',
      message: `User registered: ${user.username} (ID: ${user.id})`,
    });
    return { message: 'User registration initiated', userId: user.id };
  }

  @EventPattern('user.register.request')
  async handleUserRegisterRequest(data: CreateUserPayload) {
    console.log('Received user registration request:', data);

    const userId = uuidv4(); 
    const user = { id: userId, ...data };

    this.logClient.emit('user.created', user);

    this.logClient.emit('log.info', {
      timestamp: new Date().toISOString(),
      service: 'auth-service',
      message: `User created with id: ${userId}`,
    });
  }
}
