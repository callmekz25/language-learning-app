import React from 'react';
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
import type { FlashcardType } from '@/modules/flashcard/types/flashcard';
import type { UseFormSetValue } from 'react-hook-form';
import type { FormCollectionType } from '../types/collection';
import { SparklesIcon, Upload } from 'lucide-react';
import FlashcardFields from '@/modules/flashcard/components/flashcardFields';

type Props = {
  open: boolean;
  onChange: () => void;
  value: FlashcardType[];
  setValue: UseFormSetValue<FormCollectionType>;
};

const AutoGenFlashcardsModal = ({ open, onChange, value, setValue }: Props) => {
  const [prompt, setPrompt] = React.useState('');
  const [flashcardsPreview, setFlashcardsPreview] = React.useState<FlashcardType[]>([]);
  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = target.value.substring(0, start) + '\t' + target.value.substring(end);
      setPrompt(newValue);

      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="lg:min-w-[800px] md:min-w-[600px] w-[90%] pl-6 pr-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Auto gen flashcards</DialogTitle>
          <DialogDescription className="text-[16px]">
            Copy and Paste your data from (Word, Excel, Google Docs, etc)
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-4 pl-1 ">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bulkInput">Enter your description here</Label>
              <Textarea
                id="bulkInput"
                onKeyDown={handleTabKey}
                className="text-[16px] min-h-[90px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter description about flashcards you want"
                rows={12}
              />
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-bold">Flashcards Preview</span>
              {flashcardsPreview.map((card) => {
                return (
                  <div key={card.id} className="flex items-center">
                    <FlashcardFields card={card} readOnly={true} />
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              // onClick={handleBulkImport}
              variant="secondary"
              className="w-full py-6"
            >
              <SparklesIcon className="w-4 h-4" />
              Generate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutoGenFlashcardsModal;
