import { HttpError } from 'routing-controllers';

export class TrackNotFoundError extends HttpError {
    constructor() {
        super(404, 'track not found!');
    }
}
