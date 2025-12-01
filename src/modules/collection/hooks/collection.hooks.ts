import { useQuery } from '@tanstack/react-query';
import { getCollectionById, getCollections } from '../services/collection.services';

export const useGetCollections = (
  type?: 'public' | 'shared with me' | 'favorited' | 'recently',
) => {
  return useQuery({
    queryKey: ['collections', type],
    queryFn: () => getCollections(type),
    retry: 0,
  });
};

export const useGetCollectionById = (id: number, userId?: number, loading?: boolean) => {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => getCollectionById(id, userId),
    enabled: !!id && !loading,
    retry: 0,
  });
};
