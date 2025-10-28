import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TimelineModule } from '../timeline/timeline.module'; // 👈 import it

@Module({
  imports: [TimelineModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
