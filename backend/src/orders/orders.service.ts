import { Injectable } from '@nestjs/common';
import { TimelineService } from '../timeline/timeline.service'; // adjust path as needed

@Injectable()
export class OrdersService {
  constructor(private readonly timelineService: TimelineService) {}

  async logOrder(scenarioId: string, type: string, text: string) {
    // Later: persist to DB or trigger scenario logic
    this.timelineService.logEvent({
      scenarioId,
      actor: 'user',
      action: `Place ${type} order: ${text}`,
    });
    await Promise.resolve();
    return { status: 'ok', scenarioId, type, text };
  }
}
