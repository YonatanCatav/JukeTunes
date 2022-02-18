import { plainToClass } from 'class-transformer';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { PlaylistTracks2 } from '../models/PlaylistTracks2';
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
        this.log.info('Create queryResults new track => ', trackVote.toString());
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
            this.log.error('suspicious error due to race condition in adding queryResults vote (if it falls on constraints it\'s fine)', err);
        }
        // reArrange playlist
        return trackVote;
    }

    public async findPlaylistTracks(playlistId: string): Promise<PlaylistTracks2[]> {
        // tslint:disable-next-line:no-null-keyword

        // TOOD:IMPROVE
        // sanitize
        // SQL
        const queryResults =  await this.trackRepository.query(
            "SELECT track_id, STRING_AGG(CAST (user_id AS text),',') as users , count(user_id) cnt" +
        ' FROM public.track_vote where playlist_id = $1 group by track_id,track_id order by cnt desc', [ playlistId ]
        );
        const tracks = plainToClass(PlaylistTracks2, queryResults);

        return tracks;
    }
}
