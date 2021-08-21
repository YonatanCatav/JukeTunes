import { EntityRepository, Repository } from 'typeorm';

import { Track } from '../models/Track';

@EntityRepository(Track)
export class TrackRepository extends Repository<Track>  {

}
