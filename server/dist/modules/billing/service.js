export const billingService = {
    listPlans: async () => [{ id: 'pro', name: 'Pro', priceCents: 1299 }],
    createCheckoutSession: async () => ({ checkoutUrl: 'https://checkout.example.com/session' }),
};
