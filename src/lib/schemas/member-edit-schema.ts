import { string, z } from 'zod';

export const memberEditSchema = z.object({
  name: string().min(1, { message: 'Name is required' }),
  title: string().min(1, { message: 'Title is required' }),
  description: string().min(1, { message: 'Description is required' }),
  city: string().min(1, { message: 'City is required' }),
  country: string().min(1, { message: 'Country is required' }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
