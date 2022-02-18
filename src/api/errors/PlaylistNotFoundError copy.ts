import { HttpError } from 'routing-controllers';

export class PlaylistOrTrackNotFound extends HttpError {
    constructor(playlistFound: boolean) {
        super(404, "playlist or track wasn't found");
    }
}
