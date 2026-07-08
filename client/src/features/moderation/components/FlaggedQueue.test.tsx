import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FlaggedQueue } from './FlaggedQueue';

describe('FlaggedQueue', () => {
  it('renders flagged videos and action buttons', () => {
    render(<FlaggedQueue flags={[{ id: 'flag-1', videoTitle: 'Demo clip', reason: 'spam', status: 'pending' }]} />);

    expect(screen.getByText('Demo clip')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /approve/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reject/i })).toBeInTheDocument();
  });
});
