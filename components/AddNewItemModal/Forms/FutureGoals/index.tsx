'use client';

import { CreateMediaPayload } from '@/api/payload';
import TinyEditor, { TinyEditorProps } from '@/components/Editor';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { Button, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import {
  CreateFutureGoalsForm,
  CreateFutureGoalsFormLabel,
  CreateFutureGoalsFormName,
  CreateFutureGoalsFormSchema,
  getCreateFutureGoalsFormInitialValues,
} from './utils';

interface FutureGoalFormPropos {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function FutureGoalsForm({
  isLoading,
  onSave,
  defaultData,
}: FutureGoalFormPropos): JSX.Element {
  const { getInputProps, errors, onSubmit, values, setFieldValue } = useForm<CreateFutureGoalsForm>(
    {
      initialValues: getCreateFutureGoalsFormInitialValues(defaultData),
      validate: zodResolver(CreateFutureGoalsFormSchema),
      validateInputOnBlur: true,
      validateInputOnChange: true,
    }
  );

  const handleEditorChange: TinyEditorProps['onChange'] = (htmlContent) => {
    setFieldValue(CreateFutureGoalsFormName.htmlContent, htmlContent);
  };

  const handleSubmit = (data: CreateFutureGoalsForm) => {
    onSave({
      title: data.title,
      content: omit(data, 'title'),
      type: MediaTypes.FutureGoal,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateFutureGoalsFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateFutureGoalsFormName.title)}
          error={errors[CreateFutureGoalsFormName.title]}
        />
        <TinyEditor onChange={handleEditorChange} initialValue={values.htmlContent} />
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
