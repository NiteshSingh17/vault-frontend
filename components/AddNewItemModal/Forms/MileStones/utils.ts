import { Media, Milestone, MilestoneSchema } from '@/schema';
import { z } from 'zod';

export const CreateMilestoneFormSchema = MilestoneSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateMilestoneForm = z.infer<typeof CreateMilestoneFormSchema>;

export const CreateMilestoneFormLabel: Record<keyof CreateMilestoneForm, string> = {
  title: 'Title',
  currentStep: '',
  steps: 'Steps',
  description: 'Description',
};

export const CreateMilestoneFormName: Record<keyof CreateMilestoneForm, keyof CreateMilestoneForm> =
  {
    title: 'title',
    currentStep: 'currentStep',
    steps: 'steps',
    description: 'description',
  };

export function getCreateMilestoneFormInitialValues(data?: Media): CreateMilestoneForm {
  const milestoneContent = data?.content as Milestone | undefined;
  return {
    title: data?.title ?? '',
    description: data?.description ?? null,
    currentStep: milestoneContent?.currentStep ?? 0,
    steps: milestoneContent?.steps ?? [
      {
        date: new Date().toISOString(),
        title: '',
        amount: 0,
        description: null,
      },
    ],
  };
}
