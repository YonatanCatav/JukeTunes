import { EntityRepository, Repository } from 'typeorm';

import { Track } from '../models/Track';

@EntityRepository(Track)
export class TrackRepository extends Repository<Track>  {
    /**
     * Find by playlist_id is used for our data-loader to get all needed tracks in one query.
     */
     public findByPlaylistId(ids: string[]): Promise<Track[]> {
        return this.createQueryBuilder()
            .select()
            .where(`track.playlist_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }
}
