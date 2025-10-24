// backend/src/scenarios/scenario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Scenario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column('jsonb')
  initialVitals!: Record<string, number>;

  @Column('jsonb')
  labs!: string[];

  @Column('jsonb')
  imaging!: string[];

  @Column()
  nurseReport!: string;

  @Column('jsonb')
  branchingLogic!: Record<string, any>;
}
