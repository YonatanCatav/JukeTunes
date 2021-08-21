import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { Playlist } from './Playlist';
import { Track } from './Track';
import { User } from './User';

const uniqueConstraintName = 'idx_track_vote_unique';
const trackIdFieldName = 'track_id';
const playlistFieldName = 'playlist_id';
const userFieldName = 'user_id';

@Unique(uniqueConstraintName, [trackIdFieldName, playlistFieldName, userFieldName])
@Entity()
export class TrackVotes {

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

    @Column({
        name: playlistFieldName,
    })
    public playlist_id: string;

    @Column({
        name: userFieldName,
    })
    public user_id: string;
}
