import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('apps')
export class App{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;
    
    @Column({unique: true})
    apiKey: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: 100})
    rateLimit: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}