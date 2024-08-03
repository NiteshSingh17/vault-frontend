'use client';

import { CreateMediaPayload } from '@/api/payload';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { Button, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import {
  CreateURLForm,
  CreateURLFormLabel,
  CreateURLFormName,
  CreateURLFormSchema,
  getCreateURLFormInitialValues,
} from './utils';

interface URLFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function URLForm({ isLoading, onSave, defaultData }: URLFormProps): JSX.Element {
  const { getInputProps, errors, onSubmit } = useForm<CreateURLForm>({
    initialValues: getCreateURLFormInitialValues(defaultData),
    validate: zodResolver(CreateURLFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = (data: CreateURLForm) => {
    onSave({
      title: data.title,
      description: data.description,
      content: omit(data, ['title', 'description']),
      type: MediaTypes.Url,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateURLFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateURLFormName.title)}
          error={errors[CreateURLFormName.title]}
        />
        <Textarea
          label={CreateURLFormLabel.description}
          placeholder="Description"
          {...getInputProps(CreateURLFormName.description)}
          error={errors[CreateURLFormName.description]}
        />
        <TextInput
          label={CreateURLFormLabel.url}
          placeholder="URL"
          {...getInputProps(CreateURLFormName.url)}
          error={errors[CreateURLFormName.url]}
        />
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
