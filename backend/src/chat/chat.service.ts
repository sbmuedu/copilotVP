import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async generateReply(scenarioId: string, message: string): Promise<string> {
    await Promise.resolve(); //Satisfy ESLint
    return `Echo: ${message}`;
  }
}
