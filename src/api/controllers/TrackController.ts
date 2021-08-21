import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { PlaylistNotFoundError as PlaylistNotFoundError } from '../errors/PlaylistNotFoundError';
import { Playlist } from '../models/Playlist';
import { Track } from '../models/Track';
import { PlaylistService } from '../services/PlaylistService';
import { TrackService } from '../services/TrackService';
import { UserResponse } from './UserController';

class BaseTrack {
    @IsNotEmpty()
    public externalId: string;
}

export class TrackResponse extends BaseTrack {

    public name: string;
    public author: string;
    @ValidateNested()
    public voters: UserResponse[];
}

@Authorized()
@JsonController('/playlists/:id')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class TrackController {

    constructor(
        private trackService: TrackService
    ) { }

    @Get()
    @ResponseSchema(TrackResponse, { isArray: true })
    public find(): Promise<TrackResponse[]> {
        return this.trackService.find();
    }

    @Get('/:id')
    @OnUndefined(PlaylistNotFoundError)
    @ResponseSchema(PlaylistResponse)
    public one(@Param('id') id: string): Promise<Playlist | undefined> {
        return this.playlistService.findOne(id);
    }

    @Post()
    @ResponseSchema(PlaylistResponse)
    public create(@Req() req: any, @Body({ required: true }) body: CreatePlaylistBody): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = body.name;
        playlist.userId = body.userId;
        return this.playlistService.create(playlist);
    }

    @Put('/:id')
    @ResponseSchema(PlaylistResponse)
    public update(@Param('id') id: string, @Body() body: BasePlaylist): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = body.name;
        return this.playlistService.update(id, playlist);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.playlistService.delete(id);
    }
}
