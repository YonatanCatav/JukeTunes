/**
 * events
 * ---------------------
 * Define all your possible custom events here.
 */
export const events = {
    user: {
        created: 'onUserCreate',
    },
    playlist: {
        created: 'onPlaylistCreate',
    },
    track: {
        created: 'onTrackCreate',
        voted: 'onTrackVote',
    },
};
