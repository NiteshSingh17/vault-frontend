'use client';

import { CreateMediaPayload } from '@/api/payload';
import TinyEditor, { TinyEditorProps } from '@/components/Editor';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { Button, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import {
  CreateCompanyGrowthForm,
  CreateCompanyGrowthFormLabel,
  CreateCompanyGrowthFormName,
  CreateCompanyGrowthFormSchema,
  getCreateCompanyGrowthFormInitialValues,
} from './utils';

interface CompanyGrowthFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function CompanyGrowthForm({
  onSave,
  isLoading,
  defaultData,
}: CompanyGrowthFormProps): JSX.Element {
  const { getInputProps, errors, values, onSubmit, setFieldValue } =
    useForm<CreateCompanyGrowthForm>({
      initialValues: getCreateCompanyGrowthFormInitialValues(defaultData),
      validate: zodResolver(CreateCompanyGrowthFormSchema),
      validateInputOnBlur: true,
      validateInputOnChange: true,
    });

  const handleEditorChange: TinyEditorProps['onChange'] = (htmlContent) => {
    setFieldValue(CreateCompanyGrowthFormName.message, htmlContent);
  };

  const handleSubmit = (data: CreateCompanyGrowthForm) => {
    onSave({
      title: data.title,
      content: omit(data, 'title'),
      type: MediaTypes.CompanyGrowth,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateCompanyGrowthFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateCompanyGrowthFormName.title)}
          error={errors[CreateCompanyGrowthFormName.title]}
        />
        <Textarea
          label={CreateCompanyGrowthFormLabel.description}
          placeholder="Description"
          {...getInputProps(CreateCompanyGrowthFormName.description)}
          error={errors[CreateCompanyGrowthFormName.description]}
        />
        <TinyEditor onChange={handleEditorChange} initialValue={values.message} />
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
