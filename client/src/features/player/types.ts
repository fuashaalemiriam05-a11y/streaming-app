export type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
};

export type PlaybackSession = {
  videoId: string;
  manifestUrl: string;
  resumePosition: number;
  qualities: string[];
};
