import { useToast } from '@/shared/hooks/useToast';
import CollectionForm from '../components/collectionForm';
import { useCreateCollection } from '../hooks/collection.hooks';
import type { FormCollectionType } from '../types/collection';

const AddCollection = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useCreateCollection();
  const handleCreateCollection = (payload: FormCollectionType) => {
    mutate(payload, {
      onSuccess: () => {
        toast('Create collection successful');
      },
      onError: () => {
        toast('Create collection failed');
      },
    });
  };
  return (
    <div className="container mx-auto py-10">
      <CollectionForm
        onSubmit={handleCreateCollection}
        initialData={undefined}
        isEditing={false}
        isPending={isPending}
      />
    </div>
  );
};

export default AddCollection;
