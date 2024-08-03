'use client';

import { CreateMediaPayload } from '@/api/payload';
import { UploadFileButton, UploadFileButtonPropos } from '@/components/UploadFileButton';
import { FileTypes, Media, MediaTypes } from '@/schema';
import { getMediaURL } from '@/utils';
import { Button, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { omit } from 'lodash';
import { HiOutlineExternalLink } from 'react-icons/hi';
import {
  CreateImageForm,
  CreateImageFormLabel,
  CreateImageFormName,
  CreateImageFormSchema,
  getCreateImageFormInitialValues,
} from './utils';

interface ImageFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function ImageForm({ onSave, isLoading, defaultData }: ImageFormProps): JSX.Element {
  const { getInputProps, errors, values, onSubmit, setFieldValue } = useForm<CreateImageForm>({
    initialValues: getCreateImageFormInitialValues(defaultData),
    validate: zodResolver(CreateImageFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleUploadImage: UploadFileButtonPropos['onUploadEnd'] = (fileURL) => {
    setFieldValue(CreateImageFormName.url, fileURL);
  };

  const handleSubmit = (data: CreateImageForm) => {
    onSave({
      title: data.title,
      description: data.description,
      content: omit(data, ['title', 'description']),
      type: MediaTypes.Image,
      fileType: FileTypes.File,
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateImageFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateImageFormName.title)}
          error={errors[CreateImageFormName.title]}
        />
        <Textarea
          label={CreateImageFormLabel.description}
          placeholder="Description"
          {...getInputProps(CreateImageFormName.description)}
          error={errors[CreateImageFormName.description]}
        />
        <UploadFileButton
          folder={MediaTypes.Image}
          label={CreateImageFormLabel.url}
          placeholder="Select image"
          error={errors[CreateImageFormName.url]}
          accept="image/*"
          onUploadEnd={handleUploadImage}
        />
        {values.url?.length > 0 ? (
          <Button
            p="2"
            variant="transparent"
            rightSection={
              <a href={getMediaURL(values.url)} target="_blank" rel="noreferrer">
                <HiOutlineExternalLink size={20} color="gray" />
              </a>
            }
            color="dark"
            justify="space-between"
            size="xs"
          >
            <Text size="xs">{values.url}</Text>
          </Button>
        ) : null}
        <Button loading={isLoading} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
