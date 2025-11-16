import z from 'zod';

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500),
  tags: z.array(z.string()),
  status: z.enum(['private', 'public', 'shared']),
  sharedWith: z.array(z.string().email()),
  flashcards: z.array(
    z.object({
      id: z.string(),
      term: z.string(),
      definition: z.string(),
    }),
  ),
  createdAt: z.date(),
});
