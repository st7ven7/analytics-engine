import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from '../../database/entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepository: Repository<Analytics>,
  ) {}

  async getAllEvents() {
  return this.analyticsRepository
    .createQueryBuilder('analytics')
    .select('analytics.eventName', 'eventName')
    .addSelect('SUM(analytics.count)', 'totalCount')
    .groupBy('analytics.eventName')
    .orderBy('"totalCount"', 'DESC')
    .getRawMany();
}

  async getEventByName(eventName: string) {
  return this.analyticsRepository
    .createQueryBuilder('analytics')
    .select('analytics.eventName', 'eventName')
    .addSelect('analytics.date', 'date')
    .addSelect('SUM(analytics.count)', 'totalCount')
    .where('analytics.eventName = :eventName', { eventName })
    .groupBy('analytics.eventName')
    .addGroupBy('analytics.date')
    .orderBy('analytics.date', 'DESC')
    .getRawMany();
}

  async getAppAnalytics(appId: string) {
  return this.analyticsRepository
    .createQueryBuilder('analytics')
    .select('analytics.eventName', 'eventName')
    .addSelect('analytics.date', 'date')
    .addSelect('SUM(analytics.count)', 'totalCount')
    .where('analytics.appId = :appId', { appId })
    .groupBy('analytics.eventName')
    .addGroupBy('analytics.date')
    .orderBy('analytics.date', 'DESC')
    .getRawMany();
}
}