'use client';

import { CreateMediaPayload } from '@/api/payload';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { Button, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import {
  CreateCredentialForm,
  CredentialFormLabel,
  CredentialFormName,
  CredentialFormSchema,
  getCredentialFormInitialValue,
} from './utils';

interface CredentialFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function CredentialForm({
  isLoading,
  defaultData,
  onSave,
}: CredentialFormProps): JSX.Element {
  const { getInputProps, errors, onSubmit } = useForm<CreateCredentialForm>({
    initialValues: getCredentialFormInitialValue(defaultData),
    validate: zodResolver(CredentialFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = (data: CreateCredentialForm) => {
    onSave({
      title: data.title,
      description: data.description,
      content: omit(data, ['title', 'description']),
      type: MediaTypes.Credential,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CredentialFormLabel.title}
          placeholder="Title"
          {...getInputProps(CredentialFormName.title)}
          error={errors[CredentialFormName.title]}
        />
        <Textarea
          label={CredentialFormLabel.description}
          placeholder="Description"
          {...getInputProps(CredentialFormName.description)}
          error={errors[CredentialFormName.description]}
        />
        <TextInput
          label={CredentialFormLabel.url}
          placeholder="URL"
          {...getInputProps(CredentialFormName.url)}
          error={errors[CredentialFormName.url]}
        />
        <TextInput
          label={CredentialFormLabel.username}
          placeholder="Username"
          {...getInputProps(CredentialFormName.username)}
          error={errors[CredentialFormName.username]}
        />
        <TextInput
          label={CredentialFormLabel.password}
          placeholder="Password"
          {...getInputProps(CredentialFormName.password)}
          error={errors[CredentialFormName.password]}
        />
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
