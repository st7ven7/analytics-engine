import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { App } from '../../database/entities/app.entity';
import { CreateAppDto } from './dto/create-app.dto';

@Injectable()
export class AppsService{
    constructor(@InjectRepository(App) private readonly appRepository: Repository<App>){}

    async create(createAppDto: CreateAppDto): Promise<App> {
        const existingApp = await this.appRepository.findOne({
            where: {name: createAppDto.name}
        });

        if(existingApp){
            throw new ConflictException('An app with this name already exists');
        }

        const apiKey = `ak_live_${uuidv4().replace(/-/g, '')}`;

        const app = this.appRepository.create({
            name: createAppDto.name,
            apiKey,
            rateLimit: createAppDto.rateLimit ?? 100,
        });

        return this.appRepository.save(app);
    }

    async findAll(): Promise<App[]>{
        return this.appRepository.find();
    }
    
    async findOne(id: string): Promise<App> {
        const app = await this.appRepository.findOne({
            where: {id},
        });

        if(!app){
            throw new NotFoundException('App not found');
        }
        return app;
    }

    async findByApiKey(apiKey: string): Promise<App> {
        const app = await this.appRepository.findOne({
            where:{apiKey},
        });

        if (!app){
            throw new NotFoundException('Invalid API key');
        }
        return app;
    }
}