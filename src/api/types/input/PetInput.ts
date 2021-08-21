import { Field, InputType, Int } from 'type-graphql';

import { Playlist } from '../Playlist';

@InputType()
export class PetInput implements Partial<Playlist> {

    @Field()
    public name: string;

    @Field(type => Int, {
        description: 'The age of the pet in years.',
    })
    public age: number;

}
