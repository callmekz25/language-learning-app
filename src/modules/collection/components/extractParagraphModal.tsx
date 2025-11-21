import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, XIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import { useForm, type UseFormSetValue } from 'react-hook-form';
import type { FormCollectionType, FormParagraphType } from '../types/collection';
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';
import { extractParagraph } from '../services/collection.services';
import { useMutationWithToast } from '@/shared/hooks/useMutationWithToast';
import { formCollectionSchema, formParagraphSchema } from '../schemas/collection.schema';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  open: boolean;
  onChange: () => void;
  setValues: (newCards: FlashcardType[]) => void;
};

const ExtractParagraphModal = ({ open, onChange, setValues }: Props) => {
  const [flashcards, setFlashcards] = React.useState<FlashcardType[]>([]);

  const { mutate, isPending } = useMutationWithToast(extractParagraph, {
    invalidateKeys: ['extract-paragraph'],
    success: 'Paragraph extracted successfully',
    error: 'Failed to extract paragraph',
  });

  const form = useForm<FormParagraphType>({
    resolver: zodResolver(formParagraphSchema),
    defaultValues: {
      content: '',
    },
  });

  const { register, handleSubmit } = form;

  const handleRemoveFlashcard = useCallback((id: number) => {
    setFlashcards((prev) => prev.filter((_, index) => index !== id));
  }, []);

  const handleImportFlashcards = useCallback(() => {
    setValues(flashcards);
    onChange();
  }, [flashcards, setValues]);

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="lg:min-w-[800px] md:min-w-[600px] w-[90%] pl-6 pr-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Import your paragraph</DialogTitle>
          <DialogDescription className="text-[16px]">
            Copy and Paste your paragraph from any languages
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto pr-4 ">
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit((data) => {
                mutate(data, {
                  onSuccess: (data) => {
                    setFlashcards(data.flashcards);
                  },
                });
              })}
            >
              <div className="space-y-2">
                <Label htmlFor="paragraphInput">Paste your paragraph here</Label>
                <Textarea
                  id="paragraphInput"
                  className="text-[16px]"
                  {...register('content')}
                  rows={12}
                />
              </div>
              <div className="flex mt-4 justify-end">
                <Button
                  isPending={isPending}
                  type="submit"
                  className="px-2 py-1 bg-gray-300 rounded-md font-light cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  {isPending ? 'Extracting...' : 'Extract Flashcards'}
                </Button>
              </div>
            </form>
            <div className="flex flex-col gap-4">
              <span className="font-bold">Flashcards Preview</span>

              {flashcards.map((card, index) => {
                return (
                  <div key={index} className="flex items-center">
                    <div className="flex items-center gap-8 w-full">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="term">Term</Label>
                        <Input
                          id="term"
                          placeholder="Enter term"
                          className="py-5"
                          value={card.term}
                          onChange={(e) => {
                            setFlashcards((prev) =>
                              prev.map((c, i) =>
                                i === index ? { ...c, term: e.target.value } : c,
                              ),
                            );
                          }}
                        />
                      </div>
                      <div className="space-y-2 w-full">
                        <Label htmlFor="definition">Definition</Label>
                        <Input
                          id="definition"
                          placeholder="Enter definition"
                          className="py-5"
                          value={card.definition}
                          onChange={(e) => {
                            setFlashcards((prev) =>
                              prev.map((c, i) =>
                                i === index ? { ...c, definition: e.target.value } : c,
                              ),
                            );
                          }}
                        />
                      </div>
                    </div>
                    <button
                      tabIndex={-1}
                      onClick={() => handleRemoveFlashcard(index)}
                      aria-label="Remove card"
                      className="p-4 pt-8 pb-4 hover:cursor-pointer"
                    >
                      <XIcon className="size-5 text-red-600" />
                    </button>
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              onClick={handleImportFlashcards}
              variant="secondary"
              className="w-full py-6"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Flashcards
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExtractParagraphModal;
