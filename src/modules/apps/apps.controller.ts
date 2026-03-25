import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';

@Controller('apps')
export class AppsController{
    constructor(private readonly appsService: AppsService){}

    @Post()
    create(@Body() createAppDto: CreateAppDto){
        return this.appsService.create(createAppDto);
    }

    @Get()
    findAll(){
        return this.appsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.appsService.findOne(id);
    }
}