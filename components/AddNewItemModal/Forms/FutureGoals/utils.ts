import { FutureGoal, FutureGoalSchema, Media } from '@/schema';
import { z } from 'zod';

export const CreateFutureGoalsFormSchema = FutureGoalSchema.extend({
  title: z.string().min(1),
});

export type CreateFutureGoalsForm = z.infer<typeof CreateFutureGoalsFormSchema>;

export const CreateFutureGoalsFormLabel: Record<keyof CreateFutureGoalsForm, string> = {
  title: 'Title',
  htmlContent: '',
};

export const CreateFutureGoalsFormName: Record<
  keyof CreateFutureGoalsForm,
  keyof CreateFutureGoalsForm
> = {
  title: 'title',
  htmlContent: 'htmlContent',
};

export function getCreateFutureGoalsFormInitialValues(data?: Media): CreateFutureGoalsForm {
  const futureGoal = data?.content as FutureGoal | undefined;
  return {
    title: data?.title ?? '',
    htmlContent: futureGoal?.htmlContent ?? '',
  };
}
