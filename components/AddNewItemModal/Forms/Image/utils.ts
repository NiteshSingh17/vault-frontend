import { Image, ImageSchema, Media } from '@/schema';
import { z } from 'zod';

export const CreateImageFormSchema = ImageSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateImageForm = z.infer<typeof CreateImageFormSchema>;

export const CreateImageFormLabel: Record<keyof CreateImageForm, string> = {
  title: 'Title',
  description: 'Description',
  url: 'Upload image',
};

export const CreateImageFormName: Record<keyof CreateImageForm, keyof CreateImageForm> = {
  title: 'title',
  description: 'description',
  url: 'url',
};

export function getCreateImageFormInitialValues(data?: Media): CreateImageForm {
  const imageContent = data?.content as Image | undefined;

  return {
    title: data?.title ?? '',
    url: imageContent?.url ?? '',
    description: data?.description ?? null,
  };
}
