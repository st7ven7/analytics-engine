import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('events')
  getAllEvents() {
    return this.analyticsService.getAllEvents();
  }

  @Get('events/:eventName')
  getEventByName(@Param('eventName') eventName: string) {
    return this.analyticsService.getEventByName(eventName);
  }

  @Get('apps/:appId')
  getAppAnalytics(@Param('appId') appId: string) {
    return this.analyticsService.getAppAnalytics(appId);
  }
}