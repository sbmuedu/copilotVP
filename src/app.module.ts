import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ScenarioModule } from './scenarios/scenario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioModule } from './scenarios/scenario.module';
import { Scenario } from './scenarios/scenario.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'medsim',
        password: 'reza1',
        database: 'medsim_db',
        entities: [Scenario],
        // entities: [__dirname + '/../**/*.entity.{ts,js}'],
        // autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ScenarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
