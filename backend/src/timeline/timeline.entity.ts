import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TimelineEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  scenarioId!: string;

  @Column()
  actor!: string;

  @Column()
  action!: string;

  @CreateDateColumn()
  timestamp!: Date;
}
