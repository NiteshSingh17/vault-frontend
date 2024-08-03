import { CompanyGrowth, CompanyGrowthSchema, Media } from '@/schema';
import { z } from 'zod';

export const CreateCompanyGrowthFormSchema = CompanyGrowthSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateCompanyGrowthForm = z.infer<typeof CreateCompanyGrowthFormSchema>;

export const CreateCompanyGrowthFormLabel: Record<keyof CreateCompanyGrowthForm, string> = {
  title: 'Title',
  description: 'Description',
  message: 'Upload file',
};

export const CreateCompanyGrowthFormName: Record<
  keyof CreateCompanyGrowthForm,
  keyof CreateCompanyGrowthForm
> = {
  title: 'title',
  description: 'description',
  message: 'message',
};

export function getCreateCompanyGrowthFormInitialValues(data?: Media): CreateCompanyGrowthForm {
  const companyGrowthContent = data?.content as CompanyGrowth | undefined;
  return {
    title: data?.title ?? '',
    description: data?.description ?? null,
    message: companyGrowthContent?.message ?? '',
  };
}
