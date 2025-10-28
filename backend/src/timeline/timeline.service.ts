import { Injectable } from '@nestjs/common';
// import { TimelineEvent } from 'sharedtypes/dist/scenario';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimelineEvent } from './timeline.entity';

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(TimelineEvent)
    private readonly timelineRepo: Repository<TimelineEvent>,
  ) {}

  // private timeline: Record<string, TimelineEvent[]> = {};

  async logEvent(event: { scenarioId: string; actor: string; action: string }) {
    const entry = {
      timestamp: new Date().toISOString(),
      actor: event.actor,
      action: event.action,
    };
    await this.timelineRepo.save(entry);
  }

  async getTimeline(
    scenarioId: string,
    actor?: string,
  ): Promise<TimelineEvent[]> {
    const where = actor ? { scenarioId, actor } : { scenarioId };

    return this.timelineRepo.find({
      where,
      order: { timestamp: 'ASC' },
    });
  }
}
