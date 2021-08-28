import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Playlist } from './Playlist';

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

    @Column({
        name: 'playlist_id',
        nullable: true,
    })
    public playlistId: string;

    @ManyToOne(type => Playlist, playlist => playlist.id)
    @JoinColumn({ name: 'playlist_id' })
    public playlist: Playlist;

    public toString(): string {
        return `${this.name}`;
    }
}
