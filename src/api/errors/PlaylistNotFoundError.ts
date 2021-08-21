import { HttpError } from 'routing-controllers';

export class PlaylistNotFoundError extends HttpError {
    constructor() {
        super(404, 'playlist not found!');
    }
}
