export function formatAuthResponse(payload: unknown) {
  if (payload && typeof payload === 'object' && 'user' in payload) {
    const typedPayload = payload as { user?: { passwordHash?: string; [key: string]: unknown }; [key: string]: unknown };
    if (typedPayload.user) {
      delete typedPayload.user.passwordHash;
    }
  }
  return payload;
}
