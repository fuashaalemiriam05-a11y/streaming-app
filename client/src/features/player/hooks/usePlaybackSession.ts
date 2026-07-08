import { useEffect, useState } from 'react';
import type { PlaybackSession } from '../types';

const defaultSession: PlaybackSession = {
  videoId: 'demo-video',
  manifestUrl: '/playlist.m3u8',
  resumePosition: 0,
  qualities: ['360p', '720p', '1080p'],
};

export function usePlaybackSession() {
  const [session, setSession] = useState<PlaybackSession>(defaultSession);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resumePosition = Number(params.get('resume') ?? '0');
    setSession((current) => ({ ...current, resumePosition }));
  }, []);

  return { session, setSession };
}
