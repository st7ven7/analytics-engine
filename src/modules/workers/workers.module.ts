import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventProcessorWorker } from './event-processor.worker';
import { AggregationWorker } from './aggregation.worker';
import { Event } from '../../database/entities/event.entity';
import { Analytics } from '../../database/entities/analytics.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'event-ingestion',
    }),
    TypeOrmModule.forFeature([Event, Analytics]),
  ],
  providers: [EventProcessorWorker, AggregationWorker],
})
export class WorkersModule {}