import z from 'zod';

export const FlashcardSchema = z.object({
  id: z.number().optional().nullable(),
  term: z.string().trim().max(200, { message: 'term text must be less than 200 characters' }),
  definition: z.string().trim().max(200, { message: 'Back text must be less than 200 characters' }),
});
