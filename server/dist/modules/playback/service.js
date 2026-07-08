export const playbackService = {
    getPlaybackUrl: async (id) => ({ videoId: id, url: `https://cdn.streamcm.dev/videos/${id}` }),
};
