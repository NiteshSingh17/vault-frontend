import { Media, Video, VideoSchema } from '@/schema';
import { z } from 'zod';

export const CreateVideoFormSchema = VideoSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateVideoForm = z.infer<typeof CreateVideoFormSchema>;

export const CreateVideoFormLabel: Record<keyof CreateVideoForm, string> = {
  title: 'Title',
  description: 'Description',
  url: 'Upload video',
};

export const CreateVideoFormName: Record<keyof CreateVideoForm, keyof CreateVideoForm> = {
  title: 'title',
  description: 'description',
  url: 'url',
};

export function getCreateVideoFormInitialValues(data?: Media): CreateVideoForm {
  const videoContent = data?.content as Video | undefined;
  return {
    title: data?.title ?? '',
    description: data?.description ?? null,
    url: videoContent?.url ?? '',
  };
}
