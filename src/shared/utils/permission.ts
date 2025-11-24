import type { CollectionDetailType } from '@/modules/collection/types/collection';

export const canEditCollection = (user: any, collection: CollectionDetailType) => {
  return user && collection && user.id === collection.owner.id;
};
