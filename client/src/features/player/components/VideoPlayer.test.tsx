import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders the active session details', () => {
    render(<VideoPlayer session={{ videoId: 'video-1', manifestUrl: '/manifest.m3u8', resumePosition: 45, qualities: ['720p'] }} />);

    expect(screen.getByText('Now playing')).toBeInTheDocument();
    expect(screen.getByText('video-1')).toBeInTheDocument();
    expect(screen.getByText(/Resume at 45s/i)).toBeInTheDocument();
  });
});
