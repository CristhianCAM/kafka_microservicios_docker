import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

interface LogMessage {
  timestamp: string;
  service: string;
  message: string;
}

@Controller()
export class AppController {
  @EventPattern('log.info')
  handleLogInfo(data: LogMessage) {
    console.log('Log Event Received:', data);
    
  }
}