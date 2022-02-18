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

    @Column({
        name: 'is_playing',
        default: true,
    })
    // tslint:disable-next-line:no-inferrable-types
    public isPlaying: boolean;

    @Column({
        nullable: true,
        name: 'play_start_time',
    })
    public playStartTime: Date;

    @Column({
        nullable: true,
        name: 'last_song_start_time',
    })
    public lastSongStartTime: Date;

    @ManyToOne(type => User, user => user.playlists)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
