import { httpClient } from '@/core/htpp/httpClient';
import type { CollectionDetailType, CollectionType, FormCollectionType, FormParagraphType } from '../types/collection';
import axios from 'axios';

export const getCollections = async () => {
  const { data } = await httpClient.get<CollectionType[]>('/collections');

  return data;
};

export const getCollectionById = async (id: number) => {
  const { data } = await httpClient.get<CollectionDetailType>(`/collections/${id}`);
  return data;
};

export const createCollection = async (payload: FormCollectionType) => {
  const { data } = await httpClient.post(`/collections`, payload);
  return data;
};

export const extractParagraph = async (payload: FormParagraphType) => {
  const { data } = await httpClient.post(`/collections/extract-paragraph`, payload);
  return data;
};

export const updateCollection = async (payload: FormCollectionType) => {
  const { data } = await httpClient.put(`/collections/${payload.id}/edit`, payload);
  return data;
};
