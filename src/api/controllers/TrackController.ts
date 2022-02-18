import { IsNotEmpty, ValidateNested } from 'class-validator';
import {
    Authorized, Body, Get, JsonController, OnUndefined, Param, Post, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import uuid from 'uuid';
import { PlaylistNotFoundError } from '../errors/PlaylistNotFoundError';
import { PlaylistOrTrackNotFound } from '../errors/PlaylistNotFoundError copy';
import { Track } from '../models/Track';
import { TrackVote } from '../models/TrackVote';
import { PlaylistService } from '../services/PlaylistService';
import { TrackService } from '../services/TrackService';
import { RequestContext } from './requests/RequestContext';
import { UserResponse } from './UserController';

class BaseTrack {
    @IsNotEmpty()
    public id: string;
}

export class TrackResponse extends BaseTrack {

    public name: string;
    public author: string;
    @ValidateNested()
    public voters: UserResponse[];
}

@Authorized()
@JsonController('/playlists/:playlistId/tracks')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class TrackController {

    constructor(
        private trackService: TrackService,
        private playlistService: PlaylistService

    ) { }

    @Get()
    @OnUndefined(PlaylistNotFoundError)
    @ResponseSchema(TrackResponse, { isArray: true })
    public async find(@Param('playlistId') playlistId: string): Promise<Track[]> {
        const results = await this.trackService.findPlaylistTracks(playlistId);
        return results;
    }

    // @Get('/:id')
    // @OnUndefined(PlaylistNotFoundError)
    // @ResponseSchema(PlaylistResponse)
    // public one(@Param('id') id: string): Promise<Playlist | undefined> {
    //     return this.playlistService.findOne(id);
    // }

    @Post()
    @OnUndefined(PlaylistOrTrackNotFound)
    @ResponseSchema(TrackResponse)
    public create(@Param('playlistId') playlistId: string,
                  @Req() req: RequestContext,
                  @Body({ required: true }) body: BaseTrack): Promise<TrackVote> {
                    if (!this.playlistService.findOne(playlistId)) {
                        return undefined;
                    }
    // TODO: validation that the trackID exists
        const trackVote = new TrackVote(body.id, playlistId, req.user.id);
        return this.trackService.create(trackVote);
    }

    // @Put('/:id')
    // @ResponseSchema(PlaylistResponse)
    // public update(@Param('id') id: string, @Body() body: BasePlaylist): Promise<Playlist> {
    //     const playlist = new Playlist();
    //     playlist.name = body.name;
    //     return this.playlistService.update(id, playlist);
    // }

    // @Delete('/:id')
    // public delete(@Param('id') id: string): Promise<void> {
    //     return this.playlistService.delete(id);
    // }
}
