import { Controller, Get, Param } from '@nestjs/common';
import { ScenarioService } from './scenario.service';

@Controller('scenarios')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Get()
  getAll() {
    return this.scenarioService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.scenarioService.findOne(id);
  }
}
