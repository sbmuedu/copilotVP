// backend/src/scenarios/scenario.seed.ts
import { DataSource } from 'typeorm';
import { Scenario } from './scenario.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medsim',
  password: 'reza1',
  database: 'medsim_db',
  entities: [Scenario],
  synchronize: true,
});

void dataSource.initialize().then(async () => {
  const repo = dataSource.getRepository(Scenario);
  await repo.save({
    title: 'Chest Pain Evaluation',
    description: 'Patient presents with acute chest pain...',
    initialVitals: { heartRate: 110, bp: 140 },
    labs: ['Troponin', 'CBC'],
    imaging: ['Chest X-ray'],
    nurseReport: 'Patient is anxious and sweating.',
    branchingLogic: {},
  });
  console.log('✅ Seeded scenario');
  process.exit();
});
