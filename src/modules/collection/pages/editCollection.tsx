import React from 'react';
import CollectionForm from '../components/collectionForm';
import type { FormCollectionType } from '../types/collection';
import { useParams } from 'react-router-dom';
import { useGetCollectionById, useUpdateCollection } from '../hooks/collection.hooks';
import { useToast } from '@/shared/hooks/useToast';

const EditCollection = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { data, isLoading } = useGetCollectionById(Number(id));

  const { mutate, isPending } = useUpdateCollection();

  const handleUpdateCollection = (payload: FormCollectionType) => {
    mutate(payload, {
      onSuccess: () => {
        toast('Update collection successful');
      },
      onError: () => {
        toast('Update collection failed');
      },
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
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
