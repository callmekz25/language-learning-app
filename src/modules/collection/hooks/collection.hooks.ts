import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCollection,
  getCollectionById,
  getCollections,
  updateCollection,
} from '../services/collection.services';
import type { FormCollectionType } from '../types/collection';

export const useGetCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: getCollections,
  });
};
export const useGetCollectionById = (id: number) => {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => getCollectionById(id),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  return useMutation({
    mutationFn: (payload: FormCollectionType) => createCollection(payload),
  });
};

export const useUpdateCollection = () => {
  return useMutation({
    mutationFn: (payload: FormCollectionType) => updateCollection(payload),
  });
};
