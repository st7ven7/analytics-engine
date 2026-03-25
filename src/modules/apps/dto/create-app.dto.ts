import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from "class-validator";

export class CreateAppDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsInt()
    @Min(10)
    @Max(10000)
    rateLimit?: number;
}