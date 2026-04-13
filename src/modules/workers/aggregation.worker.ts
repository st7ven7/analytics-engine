import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'bullmq';
import { Analytics } from '../../database/entities/analytics.entity';

@Injectable()
@Processor('event-ingestion')
export class AggregationWorker extends WorkerHost {
  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepository: Repository<Analytics>,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    const { appId, eventName, receivedAt } = job.data;

    const date = new Date(receivedAt);
    date.setHours(0, 0, 0, 0);

    const existingRecord = await this.analyticsRepository.findOne({
      where: {
        appId,
        eventName,
        date: date,
      },
    });

    if (existingRecord) {
      existingRecord.count += 1;
      await this.analyticsRepository.save(existingRecord);
    } else {
      const newRecord = this.analyticsRepository.create({
        appId,
        eventName,
        count: 1,
        date: date,
      });
      await this.analyticsRepository.save(newRecord);
    }
  }
}