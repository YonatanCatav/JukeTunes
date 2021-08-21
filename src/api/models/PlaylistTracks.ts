import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { Playlist } from './Playlist';
import { Track } from './Track';

const uniqueConstraintName = 'idx_playlist_track_unique';
const trackIdFieldName = 'track_id';
const playlistFieldName = 'playlist_id';

@Unique(uniqueConstraintName, [trackIdFieldName, playlistFieldName])
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

    @Column({
        name: playlistFieldName,
    })
    public playlist_id: string;
}
