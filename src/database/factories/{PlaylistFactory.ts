import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Playlist } from '../../api/models/Playlist';

define(Playlist, (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const name = faker.name.firstName(gender);

    const playlist = new Playlist();
    playlist.id = uuid.v1();
    playlist.name = name;
    return playlist;
});
