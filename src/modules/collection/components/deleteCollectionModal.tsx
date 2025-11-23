import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import React from 'react';
import { deleteCollection } from '../services/collection.services';

const DeleteCollectionModal = ({
  deleteId,
  setDeleteId,
}: {
  deleteId: number | null;
  setDeleteId: (value: number | null) => void;
}) => {
  const { mutate, isPending } = useMutationWithToast(deleteCollection, {
    success: 'Delete success',
    error: 'Delete failed',
    invalidateKeys: ['collections'],
  });

  const handleConfirmDelete = () => {
    if (isPending) return;
    mutate(deleteId!);
    setDeleteId(null);
  };

  return (
    <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this collection and all its flashcards. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleConfirmDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionModal;
