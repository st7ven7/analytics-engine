import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { EventsService } from './events.service';
import { CreateEventDto } from "./dto/create-event.dto";
import { ApiKeyGuard } from "src/common/guards/api-key.guard";
import { CurrentApp } from "src/common/decorators/current-app.decorator";
import { App } from "src/database/entities/app.entity";


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  ingest(@CurrentApp() app: App, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.ingest(app, createEventDto);
  }
}