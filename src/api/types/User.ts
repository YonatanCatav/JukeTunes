import { Field, ID, ObjectType } from 'type-graphql';

import { Playlist } from './Playlist';

@ObjectType({
    description: 'User object.',
})
export class User {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The first name of the user.',
    })
    public firstName: string;

    @Field({
        description: 'The last name of the user.',
    })
    public lastName: string;

    @Field({
        description: 'The email of the user.',
    })
    public email: string;

    @Field(type => [Playlist], {
        description: 'A list of pets which belong to the user.',
    })
    public pets: Playlist[];

}
