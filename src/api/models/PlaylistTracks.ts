import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Playlist } from './Playlist';
import { Track } from './Track';

const trackIdFieldName = 'track_id';
const playlistFieldName = 'playlist_id';

@Entity()
export class PlaylistTracks {

    @ManyToOne(type => Track, track => track.id)
    @IsNotEmpty()
    @JoinColumn({ name: trackIdFieldName })
    public track: Track;

    @ManyToOne(type => Playlist, playlist => playlist.id)
    @IsNotEmpty()
    @JoinColumn({ name: playlistFieldName })
    public playlist: Playlist;

    @PrimaryColumn({
        name: trackIdFieldName,
    })
    public track_id: string;

    @IsNotEmpty()
    @Column({default: true})
    // tslint:disable-next-line:no-inferrable-types
    public is_played: boolean = false;

    @PrimaryColumn({
        name: playlistFieldName,
    })
    public playlist_id: string;
}
