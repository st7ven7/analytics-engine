import { IsString, IsNotEmpty, IsOptional, IsObject, IsUUID } from "class-validator";

export class CreateEventDto{
    @IsString()
    @IsNotEmpty()
    eventName: string;

    @IsString()
    @IsOptional()
    userId?: string;
    
    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;
}