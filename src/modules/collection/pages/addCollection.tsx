import React from 'react';
import CollectionForm from '../components/collectionForm';
import type { CollectionType } from '../types/collection';

const AddCollection = () => {
  const handleAddCollection = (collection: Omit<CollectionType, 'id' | 'createdAt' | 'owner'>) => {
    const newCollection: CollectionType = {
      ...collection,
      id: Date.now().toString(),
    };
    // setCollections([...collections, newCollection]);
  };
  return (
    <div className="container mx-auto py-10">
      <CollectionForm onSubmit={handleAddCollection} initialData={undefined} isEditing={false} />
    </div>
  );
};

export default AddCollection;
