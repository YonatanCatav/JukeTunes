import DataLoader from 'dataloader';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { Playlist as playlistModel } from '../models/Playlist';
import { User as UserModel } from '../models/User';
import { PlaylistService } from '../services/PlaylistService';
import { PlaylistInput } from '../types/input/PlaylistInput';
import { Playlist } from '../types/Playlist';

@Service()
@Resolver(of => Playlist)
export class PlaylistResolver {

    constructor(
        private playlistService: PlaylistService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
    ) { }

    @Query(returns => [Playlist])
    public playlists(@Ctx() { requestId }: Context): Promise<playlistModel[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.playlistService.find();
    }

    @Mutation(returns => Playlist)
    public async addPlaylist(@Arg('playlist') playlist: PlaylistInput): Promise<playlistModel> {
        const newPlaylist = new playlistModel();
        newPlaylist.name = playlist.name;
        newPlaylist.description = playlist.description;
        return this.playlistService.create(newPlaylist);
    }

    @FieldResolver()
    public async owner(@Root() playlist: playlistModel): Promise<any> {
        if (playlist.userId) {
            return this.userLoader.load(playlist.userId);
        }
        // return this.userService.findOne(`${playlist.userId}`);
    }

    // user: createDataLoader(UserRepository),

    //     playlistsByUserIds: createDataLoader(playlistRepository, {
    //         method: 'findByUserIds',
    //         key: 'userId',
    //         multiple: true,
    //     }),

}
