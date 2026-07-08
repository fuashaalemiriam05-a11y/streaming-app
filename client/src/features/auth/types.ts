export type AuthUser = {
  id: string;
  email: string;
  role: 'viewer' | 'creator' | 'moderator' | 'admin';
};
