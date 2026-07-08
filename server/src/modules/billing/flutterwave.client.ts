export async function createFlutterwaveCharge(payload: { reference: string; amountCents: number; planId: string }) {
  return {
    reference: payload.reference,
    amountCents: payload.amountCents,
    planId: payload.planId,
    status: 'PENDING',
  };
}
