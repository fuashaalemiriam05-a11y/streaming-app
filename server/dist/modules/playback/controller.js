import { playbackService } from './service.js';
export const playbackController = {
    getPlaybackUrl: async (req, res) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const result = await playbackService.getPlaybackUrl(id);
        res.json({ data: result, meta: {}, error: null });
    },
};
