import { Media, NewIdea, NewIdeaSchema } from '@/schema';
import { z } from 'zod';

export const CreateNewIdeaFormSchema = NewIdeaSchema.extend({
  title: z.string().min(1),
});

export type CreateNewIdeaForm = z.infer<typeof CreateNewIdeaFormSchema>;

export const CreateNewIdeaFormLabel: Record<keyof CreateNewIdeaForm, string> = {
  title: 'Title',
  htmlContent: '',
};

export const CreateNewIdeaFormName: Record<keyof CreateNewIdeaForm, keyof CreateNewIdeaForm> = {
  title: 'title',
  htmlContent: 'htmlContent',
};

export function getCreateNewIdeaFormInitialValues(data?: Media): CreateNewIdeaForm {
  const editorContent = data?.content as NewIdea | undefined;
  return {
    title: data?.title ?? '',
    htmlContent: editorContent?.htmlContent ?? '',
  };
}
