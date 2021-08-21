import { Connection } from 'typeorm';
import { Factory, Seed, times } from 'typeorm-seeding';

import { User } from '../../../src/api/models/User';
import { Playlist } from '../../api/models/Playlist';

export class CreatePlaylists implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const playlist = await factory(Playlist)().seed();
            const user = await factory(User)().make();
            user.playlists = [playlist];
            return await em.save(user);
        });
    }

}
