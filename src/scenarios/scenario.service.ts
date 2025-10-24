import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from './scenario.entity';

@Injectable()
export class ScenarioService {
  constructor(
    @InjectRepository(Scenario)
    private readonly scenarioRepo: Repository<Scenario>,
  ) {}

  findAll(): Promise<Scenario[]> {
    return this.scenarioRepo.find();
  }

  findOne(id: string): Promise<Scenario | null> {
    return this.scenarioRepo.findOneBy({ id });
  }
}
