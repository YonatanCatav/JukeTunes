import { Field, ID, ObjectType } from 'type-graphql';

import { Playlist } from './Playlist';
import { User } from './User';

@ObjectType({
    description: 'Track info inside a playlist.',
})
export class Track {

    @Field(type => ID)
    public id: string;

    @Field(type => String, {
        description: 'The id associated to this track in the external system',
    })
    public externalId: string;

    @Field(type => String, {
        description: 'Name of the song',
    })
    public name: string;

    @Field(type => String, {
        description: 'The author name',
    })
    public author: string;

    @Field(type => Number, {
        description: 'the position of the track in the playlist',
    })
    public order: number;

    @Field(type => Playlist, {
        description: 'the playlist that the track belongs to',
    })

    public playlist: Playlist;

    @Field(type => [User], {
        description: 'The users that voted to this track',
        nullable: true,
    })

    public voters: Set<User>|undefined;
}
