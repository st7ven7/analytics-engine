import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { EventsService } from './events.service';
import { CreateEventDto } from "./dto/create-event.dto";
import { ApiKeyGuard } from "src/common/guards/api-key.guard";


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  ingest(@Req() request: any, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.ingest(request.app, createEventDto);
  }
}