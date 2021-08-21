import { EntityRepository, Repository } from 'typeorm';

import { PlaylistTracks } from '../models/PlaylistTracks';

@EntityRepository(PlaylistTracks)
export class PlaylistTrackRepository extends Repository<PlaylistTracks>  {

}
