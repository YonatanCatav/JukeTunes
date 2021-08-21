import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Playlist } from '../models/Playlist';
import { User } from '../models/User';
import { PlaylistRepository as PlaylistRepository } from '../repositories/PlaylistRepository';
import { events } from '../subscribers/events';

@Service()
export class PlaylistService {

    constructor(
        @OrmRepository() private playlistRepository: PlaylistRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Playlist[]> {
        this.log.info('Find all playlists');
        return this.playlistRepository.find();
    }

    public findByUser(user: User): Promise<Playlist[]> {
        this.log.info('Find all playlists of the user', user.toString());
        return this.playlistRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: string): Promise<Playlist | undefined> {
        this.log.info('Find all playlists');
        return this.playlistRepository.findOne({ id });
    }

    public async create(playlist: Playlist): Promise<Playlist> {
        this.log.info('Create a new playlist => ', playlist.toString());
        playlist.id = uuid.v1();
        const newPlaylist = await this.playlistRepository.save(playlist);
        this.eventDispatcher.dispatch(events.playlist.created, newPlaylist);
        return newPlaylist;
    }

    public update(id: string, playlist: Playlist): Promise<Playlist> {
        this.log.info('Update a playlist');
        playlist.id = id;
        return this.playlistRepository.save(playlist);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a playlist');
        await this.playlistRepository.delete(id);
        return;
    }

}
