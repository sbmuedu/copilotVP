import { Controller, Get, Param, Query } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get(':scenarioId')
  getTimeline(
    @Param('scenarioId') scenarioId: string,
    @Query('actor') actor?: string,
  ) {
    return this.timelineService.getTimeline(scenarioId, actor);
  }
}
