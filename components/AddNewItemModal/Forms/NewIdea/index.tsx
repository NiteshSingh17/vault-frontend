'use client';

import { CreateMediaPayload } from '@/api/payload';
import TinyEditor, { TinyEditorProps } from '@/components/Editor';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { Button, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import {
  CreateNewIdeaForm,
  CreateNewIdeaFormLabel,
  CreateNewIdeaFormName,
  CreateNewIdeaFormSchema,
  getCreateNewIdeaFormInitialValues,
} from './utils';

interface NewIdeaFormPropos {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function NewIdeaForm({ isLoading, onSave, defaultData }: NewIdeaFormPropos): JSX.Element {
  const { getInputProps, errors, onSubmit, values, setFieldValue } = useForm<CreateNewIdeaForm>({
    initialValues: getCreateNewIdeaFormInitialValues(defaultData),
    validate: zodResolver(CreateNewIdeaFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleEditorChange: TinyEditorProps['onChange'] = (htmlContent) => {
    setFieldValue(CreateNewIdeaFormName.htmlContent, htmlContent);
  };

  const handleSubmit = (data: CreateNewIdeaForm) => {
    onSave({
      title: data.title,
      content: omit(data, 'title'),
      type: MediaTypes.NewIdea,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateNewIdeaFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateNewIdeaFormName.title)}
          error={errors[CreateNewIdeaFormName.title]}
        />
        <TinyEditor onChange={handleEditorChange} initialValue={values.htmlContent} />
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
