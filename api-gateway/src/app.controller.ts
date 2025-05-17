import { Controller, Post, Body, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';



interface CreateUserRequest {
  username: string;
  email: string;
}

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) { }
  
  async onModuleInit() {
    this.authClient.subscribeToResponseOf('user.register.request');
    this.userClient.subscribeToResponseOf('user.get');
    this.userClient.subscribeToResponseOf('user.get.reply');
    await this.authClient.connect();
    await this.userClient.connect();
  }
  
  @Post('register')
  async register(@Body() createUserRequest: CreateUserRequest) {
    return this.authClient.emit('user.register.request', createUserRequest);
  }
  
  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    const response = this.userClient.send('user.get', id);
    return lastValueFrom(response);
    
  }

} 