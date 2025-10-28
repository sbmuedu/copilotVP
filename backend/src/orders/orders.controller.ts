import { Controller, Post, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':scenarioId')
  async placeOrder(
    @Param('scenarioId') scenarioId: string,
    @Body('type') type: string,
    @Body('text') text: string,
  ) {
    return await this.ordersService.logOrder(scenarioId, type, text);
  }
}
