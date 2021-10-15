import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Track {

    @IsNotEmpty()
    @PrimaryColumn()
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column({nullable: true})
    public description: string;

    @Column()
    public author: string;

    @Column()
    public durationMs: number;

    public toString(): string {
        return `${this.name}`;
    }
}
