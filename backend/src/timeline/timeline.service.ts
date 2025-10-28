import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimelineEvent } from './timeline.entity';
// import PDFDocument from 'pdfkit';
// import type { PDFDocument as PDFDocumentType } from 'pdfkit';
import { PDFDocument, rgb } from 'pdf-lib';
@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(TimelineEvent)
    private readonly timelineRepo: Repository<TimelineEvent>,
  ) {}

  async logEvent(event: {
    scenarioId: string;
    actor: string;
    action: string;
  }): Promise<TimelineEvent> {
    const entry = this.timelineRepo.create({
      scenarioId: event.scenarioId, // Added missing scenarioId
      timestamp: new Date(),
      actor: event.actor,
      action: event.action,
    });
    return await this.timelineRepo.save(entry);
  }

  async getTimeline(
    scenarioId: string,
    actor?: string,
    start?: string,
    end?: string,
  ): Promise<TimelineEvent[]> {
    const query = this.timelineRepo
      .createQueryBuilder('event')
      .where('event.scenarioId = :scenarioId', { scenarioId });

    if (actor) {
      query.andWhere('event.actor = :actor', { actor });
    }
    if (start) {
      query.andWhere('event.timestamp >= :start', { start });
    }
    if (end) {
      query.andWhere('event.timestamp < :end', { end });
    }

    return await query.orderBy('event.timestamp', 'ASC').getMany();
  }

  async generatePdf(scenarioId: string): Promise<Buffer> {
    const events = await this.getTimeline(scenarioId);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { height } = page.getSize();

    let yPosition = height - 50;

    page.drawText(`Timeline for Scenario ${scenarioId}`, {
      x: 50,
      y: yPosition,
      size: 18,
      color: rgb(0, 0, 0),
    });

    yPosition -= 30;

    for (const event of events) {
      const timestamp =
        event.timestamp instanceof Date
          ? event.timestamp.toISOString()
          : new Date(event.timestamp).toISOString();

      page.drawText(`${timestamp} - ${event.actor}: ${event.action}`, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });

      yPosition -= 15;
    }

    return Buffer.from(await pdfDoc.save());
  }
  // async generatePdf(scenarioId: string): Promise<Buffer> {
  //   const events = await this.getTimeline(scenarioId);
  //   const PDFDocument = (await import('pdfkit')).default;
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const doc: any = new PDFDocument();
  //       const chunks: Buffer[] = [];

  //       doc.on('data', (chunk: Buffer) => chunks.push(chunk));
  //       doc.on('end', () => {
  //         resolve(Buffer.concat(chunks));
  //       });
  //       doc.on('error', reject);

  //       // PDF content
  //       doc
  //         .fontSize(18)
  //         .text(`Timeline for Scenario ${scenarioId}`, { underline: true });
  //       doc.moveDown();

  //       events.forEach((event) => {
  //         const timestamp =
  //           event.timestamp instanceof Date
  //             ? event.timestamp.toISOString()
  //             : new Date(event.timestamp).toISOString();

  //         doc
  //           .fontSize(12)
  //           .text(`${timestamp} - ${event.actor}: ${event.action}`)
  //           .moveDown(0.5);
  //       });
  //       doc.end();
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         console.error('PDF creation failed:', error.message);
  //         reject(error);
  //       } else {
  //         reject(new Error('Unknown error occurred during PDF creation'));
  //       }
  //     }
  //   });
  // }
}
