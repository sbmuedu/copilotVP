// import { Controller } from '@nestjs/common';

// @Controller('chat')
// export class ChatController {}

@Post(':scenarioId')
async sendMessage(
  @Param('scenarioId') scenarioId: string,
  @Body('message') message: string
) {
  const reply = await this.chatService.generateReply(scenarioId, message);
  return { reply };
}
