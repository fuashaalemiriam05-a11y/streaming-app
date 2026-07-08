import { useEffect, useState } from 'react';
import type { PlaybackSession } from '../types';

type VideoPlayerProps = {
  session: PlaybackSession;
  onTimeUpdate?: (time: number) => void;
};

export function VideoPlayer({ session, onTimeUpdate }: VideoPlayerProps) {
  const [currentTime, setCurrentTime] = useState(session.resumePosition);

  useEffect(() => {
    setCurrentTime(session.resumePosition);
  }, [session.resumePosition]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold">Now playing</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{session.videoId}</p>
      <div className="mt-4 rounded-lg border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
        <p>Video player placeholder</p>
        <p className="mt-2">Resume at {currentTime}s</p>
      </div>
      <button
        className="mt-4 rounded bg-slate-900 px-4 py-2 text-sm text-white"
        type="button"
        onClick={() => {
          const nextTime = currentTime + 10;
          setCurrentTime(nextTime);
          onTimeUpdate?.(nextTime);
        }}
      >
        Advance 10s
      </button>
    </div>
  );
}
