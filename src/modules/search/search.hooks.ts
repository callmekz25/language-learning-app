import { useQuery } from '@tanstack/react-query';
import { searchCollections } from './search.services';

export const useSearch = (query?: {
  q?: string;
  term_min?: number;
  term_max?: number;
  sort?: 'favorited' | 'played' | 'latest';
}) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchCollections(query),
    enabled: !!query,
  });
};
