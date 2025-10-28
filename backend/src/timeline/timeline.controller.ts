import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { Response } from 'express';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get(':scenarioId')
  getTimeline(
    @Param('scenarioId') scenarioId: string,
    @Query('actor') actor?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.timelineService.getTimeline(scenarioId, actor, start, end);
  }

  @Get(':scenarioId/pdf')
  async getTimelinePdf(
    @Param('scenarioId') scenarioId: string,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.timelineService.generatePdf(scenarioId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=timeline-${scenarioId}.pdf`,
    });
    res.send(pdfBuffer);
  }
}
