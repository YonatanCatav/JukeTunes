import { IsNotEmpty } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Playlist } from './Playlist';
import { Track } from './Track';
import { User } from './User';

const trackIdFieldName = 'track_id';
const playlistFieldName = 'playlist_id';
const userFieldName = 'user_id';

@Entity()
export class TrackVote {

    @ManyToOne(type => Track, track => track.id)
    @IsNotEmpty()
    @JoinColumn({ name: trackIdFieldName })
    public track: Track;

    @ManyToOne(type => Playlist, playlist => playlist.id)
    @IsNotEmpty()
    @JoinColumn({ name: playlistFieldName })
    public playlist: Playlist;

    @ManyToOne(type => User, user => user.id)
    @IsNotEmpty()
    @JoinColumn({ name: userFieldName })
    public user: User;

    @PrimaryColumn({
        name: trackIdFieldName,
    })
    public track_id: string;

    @PrimaryColumn({
        name: playlistFieldName,
    })
    public playlist_id: string;

    @PrimaryColumn({
        name: userFieldName,
    })
    public user_id: string;

    constructor(track: string, playlist: string, user: string) {
        this.playlist_id = playlist;
        this.track_id = track;
        this.user_id = user;
    }
}
