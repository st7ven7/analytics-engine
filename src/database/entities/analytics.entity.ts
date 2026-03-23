import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { App } from "./app.entity";

@Entity('analytics')
export class Analytics{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    appId: string;

    @ManyToOne(() => App)
    @JoinColumn({ name: 'appId' })
    app: App;

    @Column()
    eventName: string;

    @Column({ type: 'int', default: 0 })
    count: number;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}