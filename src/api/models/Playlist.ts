import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Playlist {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column({nullable: true})
    public description: string;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: string;

    @ManyToOne(type => User, user => user.playlists)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
