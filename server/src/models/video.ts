export type VideoRecord = {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'processing';
};
