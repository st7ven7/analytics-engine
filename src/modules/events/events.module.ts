import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { AppsModule } from '../apps/apps.module';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'event-ingestion',
        }),
        AppsModule,
    ],
    controllers: [EventsController],
    providers: [EventsService]
})

export class EventsModule{}