import { useState } from 'react';
import type { BillingPlan } from '../types';

export function useSubscription() {
  const [plans] = useState<BillingPlan[]>([
    { id: 'basic', name: 'Basic', priceCents: 0 },
    { id: 'pro', name: 'Pro', priceCents: 1299 },
    { id: 'creator', name: 'Creator', priceCents: 4999 },
  ]);

  const [selectedPlanId, setSelectedPlanId] = useState('pro');
  const [checkoutUrl, setCheckoutUrl] = useState<string>();

  const selectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setCheckoutUrl(`https://checkout.flutterwave.com/pay/${planId}`);
  };

  return { plans, selectedPlanId, checkoutUrl, selectPlan };
}
