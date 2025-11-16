import React from 'react';
import CollectionForm from '../components/collectionForm';
import type { CollectionType } from '../types/collection';
import { useParams } from 'react-router-dom';

const EditCollection = () => {
  const [data, setData] = React.useState<CollectionType | null>(null);
  const [collections, setCollections] = React.useState<CollectionType[]>([
    {
      id: '1',
      name: 'French Basics',
      description: 'Essential French phrases for beginners',
      tags: ['French', 'Beginner', 'Greetings'],
      status: 'public',

      sharedWith: [],
      flashcards: [
        { id: '1', term: 'Bonjour', definition: 'Hello' },
        { id: '2', term: 'Au revoir', definition: 'Goodbye' },
        { id: '3', term: 'Merci', definition: 'Thank you' },
        { id: '4', term: "S'il vous plaît", definition: 'Please' },
      ],
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Spanish Travel',
      description: 'Useful Spanish phrases for traveling',
      tags: ['Spanish', 'Travel', 'Intermediate'],
      status: 'private',

      sharedWith: [],
      flashcards: [
        { id: '1', term: '¿Dónde está el baño?', definition: 'Where is the bathroom?' },
        { id: '2', term: '¿Cuánto cuesta?', definition: 'How much does it cost?' },
        { id: '3', term: 'Una mesa para dos', definition: 'A table for two' },
      ],
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Business English',
      description: 'Professional English vocabulary and expressions',
      tags: ['English', 'Business', 'Advanced'],
      status: 'shared',

      sharedWith: ['john@example.com', 'sarah@example.com'],
      flashcards: [
        {
          id: '1',
          term: 'Deadline',
          definition: 'The latest time by which something must be completed',
        },
        {
          id: '2',
          term: 'Stakeholder',
          definition: 'A person with an interest in a business or project',
        },
      ],
      createdAt: new Date(),
    },
  ]);
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      const collection = collections.find((c) => c.id === id);
      if (collection) {
        setData(collection);
      }
    }
  }, [collections, id]);

  const handleEditCollection = (collection: Omit<CollectionType, 'id' | 'createdAt' | 'owner'>) => {
    // if (editingCollection) {
    //   setCollections(
    //     collections.map((c) => (c.id === editingCollection.id ? { ...c, ...collection } : c)),
    //   );
    //   setEditingCollection(null);
    //   setIsFormOpen(false);
    // }
  };

  return (
    <div className=" container mx-auto py-10">
      <CollectionForm
        onSubmit={handleEditCollection}
        initialData={data ?? undefined}
        isEditing={true}
      />
    </div>
  );
};

export default EditCollection;
