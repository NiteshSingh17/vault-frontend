import { Media, URLData, URLSchema } from '@/schema';
import { z } from 'zod';

export const CreateURLFormSchema = URLSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateURLForm = z.infer<typeof CreateURLFormSchema>;

export const CreateURLFormLabel: Record<keyof CreateURLForm, string> = {
  title: 'Title',
  description: 'Description',
  url: 'URL',
};

export const CreateURLFormName: Record<keyof CreateURLForm, keyof CreateURLForm> = {
  title: 'title',
  description: 'description',
  url: 'url',
};

export function getCreateURLFormInitialValues(data?: Media): CreateURLForm {
  const urlContent = data?.content as URLData | undefined;
  return {
    title: data?.title ?? '',
    description: data?.description ?? '',
    url: urlContent?.url ?? '',
  };
}
