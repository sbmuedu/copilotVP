import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async generateReply(scenarioId: string, message: string): Promise<string> {
    // Placeholder logic — later integrate LLM or scenario branching
    await Promise.resolve();
    return `Echo: ${message}`;
  }
}
