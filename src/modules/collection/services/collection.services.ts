import { httpClient } from '@/core/htpp/httpClient';

export const getCollections = async () => {
  const { data } = await httpClient.get('/collections');
  return data;
};
