import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { App } from "./app.entity";

@Entity('events')
export class Event{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    appId: string;

    @ManyToOne(() => App)
    @JoinColumn({name: 'appId'})
    app: App

    @Column()
    eventName: string;

    @Column({nullable: true})
    userId: string;
    
    @Column({type: 'jsonb', nullable: true})
    metadata: Record<string, any>;

    @Column({ default: 'pending' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}