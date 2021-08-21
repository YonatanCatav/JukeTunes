import { EntityRepository, Repository } from 'typeorm';

import { Playlist } from '../models/Playlist';

@EntityRepository(Playlist)
export class PlaylistRepository extends Repository<Playlist> {

    /**
     * Find by user_id is used for our data-loader to get all needed playlists in one query.
     */
    public findByUserIds(ids: string[]): Promise<Playlist[]> {
        return this.createQueryBuilder()
            .select()
            .where(`playlist.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
