import React from 'react';
import CollectionForm from '../components/collectionForm';
import type { FormCollectionType } from '../types/collection';
import { useParams } from 'react-router-dom';
import { useGetCollectionById } from '../hooks/collection.hooks';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { updateCollection } from '../services/collection.services';
import Loading from '@/components/ui/loading';
import { useAuth } from '@/shared/hooks/useAuth';

const EditCollection = () => {
  const { id } = useParams();
  const { user, isLoading: ild } = useAuth();
  const { data, isLoading } = useGetCollectionById(Number(id), user?.id, ild);

  const { mutate, isPending } = useMutationWithToast(updateCollection, {
    invalidateKeys: ['collections', id!],
  });

  const handleUpdateCollection = (payload: FormCollectionType) => {
    mutate(payload);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" container mx-auto py-10">
      <CollectionForm
        onSubmit={handleUpdateCollection}
        initialData={data}
        isEditing={true}
        isPending={isPending}
      />
    </div>
  );
};

export default EditCollection;
