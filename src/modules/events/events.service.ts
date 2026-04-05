import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateEventDto } from './dto/create-event.dto';
import { App } from '../../database/entities/app.entity';

@Injectable()
export class EventsService{
    constructor(@InjectQueue('event-ingestion') private readonly eventQueue: Queue){}

    async ingest(app:App, createEventDto: CreateEventDto){
        const job = await this.eventQueue.add('process-event',{
            appId: app.id,
            eventName: createEventDto.eventName,
            userId: createEventDto.userId ?? null,
            metadata: createEventDto.metadata ?? {},
            receivedAt: new Date().toISOString(),
        });

        return {
            message: 'Event received',
            jobId: job.id,
        };
    }
}