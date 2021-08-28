import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Track } from '../models/Track';
import { TrackVote } from '../models/TrackVote';
import { TrackRepository } from '../repositories/TrackRepository';
import { TrackVotesRepository } from '../repositories/TrackVotesRepository';
import { events } from '../subscribers/events';

@Service()
export class TrackService {

    constructor(
        @OrmRepository() private trackRepository: TrackRepository,
        @OrmRepository() private trackVotesRepository: TrackVotesRepository,
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
        this.log.info('UpVoteTrack => ', trackVote);
        const how = await this.trackVotesRepository.findOne(trackVote);
        console.log('how', how);
        console.log('how2', how === undefined);
        // Get from service data
        if ((await this.trackVotesRepository.findOne(trackVote))) {
            console.log('how3', 'why...');
            return trackVote;
        }
        console.log('repo1', console.log(this.trackRepository));
        console.log('repo2', console.log(this.trackVotesRepository));
        console.log("I'll save it1!");

        this.trackVotesRepository.create(trackVote);
        console.log("I'll save it2!");

        try {
            console.log("I'll save it3!");
         await this.trackVotesRepository.create(trackVote);
        } catch (err) {
            console.error('screwed!', err);
            this.log.error('suspicious error due to race condition in adding a vote (if it falls on constraints it\'s fine)', err);
        }
        // reArrange playlist
        return trackVote;
    }

    public findPlaylistTracks(playlistId: string): Promise<Track[]> {
        this.log.info('Find all tracks of playlist', playlistId);
        return this.trackRepository.find({
            where: {
                playlist_id: playlistId,
            },
        });
    }
}
