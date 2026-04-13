import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'bullmq';
import { Event } from '../../database/entities/event.entity';

@Injectable()
@Processor('event-ingestion')
export class EventProcessorWorker extends WorkerHost {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    const { appId, eventName, userId, metadata, receivedAt } = job.data;

    const event = this.eventRepository.create({
      appId,
      eventName,
      userId,
      metadata,
      status: 'processed',
      createdAt: new Date(receivedAt),
    });

    await this.eventRepository.save(event);
  }
}