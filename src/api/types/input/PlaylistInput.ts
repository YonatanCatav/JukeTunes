import { Field, InputType } from 'type-graphql';

import { Playlist } from '../Playlist';

@InputType()
export class PlaylistInput implements Partial<Playlist> {

    @Field()
    public name: string;

}
