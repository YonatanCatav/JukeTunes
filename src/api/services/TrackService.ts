import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Track } from '../models/Track';
import { TrackVote } from '../models/TrackVote';
import { TrackRepository } from '../repositories/TrackRepository';
import { TrackVoteRepository } from '../repositories/TrackVoteRepository';
import { events } from '../subscribers/events';

@Service()
export class TrackService {

    constructor(
        @OrmRepository() private trackRepository: TrackRepository,
        @OrmRepository() private trackVotesRepository: TrackVoteRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(trackVote: TrackVote): Promise<TrackVote> {
        this.log.info('Create a new track => ', trackVote.toString());
        // Get from service data
        const id = trackVote.track_id;
        const trackWithData = await this.trackRepository.findOne({ id });
        if (!trackWithData) {
        // enrich from service
            const name = 'horseName';
            const author = 'fui';
            await this.trackRepository.save( {id, name, author} );
        }
        await this.upVote(trackVote);
        this.eventDispatcher.dispatch(events.track.created, trackVote);
        return trackVote;
    }

    public async upVote(trackVote: TrackVote): Promise<TrackVote> {
        // Get from service data
        if ((await this.trackVotesRepository.findOne(trackVote))) {
            return trackVote;
        }

        try {
         await this.trackVotesRepository.save(trackVote);
        } catch (err) {
            console.error('screwed!', err);
            this.log.error('suspicious error due to race condition in adding a vote (if it falls on constraints it\'s fine)', err);
        }
        // reArrange playlist
        return trackVote;
    }

    public findPlaylistTracks(playlistId: string): Promise<Track[]> {
        this.log.info(`Find all tracks of playlist4 ${playlistId}`, playlistId);
        // tslint:disable-next-line:no-null-keyword
        return null;
        // return await this.trackRepository.createQueryBuilder("playlist_tracks").groupBy("track_id").addOrderBy
    }
}
