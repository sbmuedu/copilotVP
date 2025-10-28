import { Body, Controller, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post(':scenarioId')
  async sendMessage(
    @Param('scenarioId') scenarioId: string,
    @Body('message') message: string,
  ) {
    const reply = await this.chatService.generateReply(scenarioId, message);
    return { reply };
  }
}
