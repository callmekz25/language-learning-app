import { httpClient } from '@/core/htpp/httpClient';

export const searchCollections = async (query?: {
  q?: string;
  term_min?: number;
  term_max?: number;
  sort?: 'favorited' | 'played' | 'latest';
}) => {
  const { data } = await httpClient.get('/collections/search', {
    params: query,
  });
  return data;
};
