import type z from 'zod';
import type { collectionSchema } from '../schemas/collection.schema';

export type CollectionType = z.infer<typeof collectionSchema>;
