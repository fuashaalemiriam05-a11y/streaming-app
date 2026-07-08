import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MomoCheckout } from './MomoCheckout';

describe('MomoCheckout', () => {
  it('renders the checkout prompt and action', () => {
    render(<MomoCheckout checkoutUrl="https://checkout.example.com" />);

    expect(screen.getByText('Mobile money checkout')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm payment/i })).toBeInTheDocument();
  });
});
