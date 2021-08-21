import { Field, ID, Int, ObjectType } from 'type-graphql';

import { Track } from './Track';
import { User } from './User';

@ObjectType({
    description: 'Playlist object.',
})
export class Playlist {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The name of the playlist.',
    })
    public name: string;

    @Field(type => String, {
        description: 'Description about the playlist',
    })
    public description: string;

    @Field(type => [Track], {
    })
    public tracks: Track[];

    @Field(type => User, {
        nullable: true,
    })
    public owner: User;

}
