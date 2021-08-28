import { EntityRepository, Repository } from 'typeorm';

import { TrackVote } from '../models/TrackVote';

@EntityRepository(TrackVote)
export class TrackVotesRepository extends Repository<TrackVote>  {

}
