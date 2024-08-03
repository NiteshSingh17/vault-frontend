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
  CreateVideoForm,
  CreateVideoFormLabel,
  CreateVideoFormName,
  CreateVideoFormSchema,
  getCreateVideoFormInitialValues,
} from './utils';

interface VideoFormProps {
  isLoading: boolean;
  defaultData?: Media;
  onSave: (data: CreateMediaPayload) => void;
}

export function VideoForm({ isLoading, onSave, defaultData }: VideoFormProps): JSX.Element {
  const { getInputProps, errors, onSubmit, values, setFieldValue } = useForm<CreateVideoForm>({
    initialValues: getCreateVideoFormInitialValues(defaultData),
    validate: zodResolver(CreateVideoFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleUploadImage: UploadFileButtonPropos['onUploadEnd'] = (fileURL) => {
    setFieldValue(CreateVideoFormName.url, fileURL);
  };

  const handleSubmit = (data: CreateVideoForm) => {
    onSave({
      title: data.title,
      description: data.description,
      content: omit(data, ['title', 'description']),
      type: MediaTypes.Video,
      fileType: FileTypes.File,
    });
  };
  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label={CreateVideoFormLabel.title}
          placeholder="Title"
          {...getInputProps(CreateVideoFormName.title)}
          error={errors[CreateVideoFormName.title]}
        />
        <Textarea
          label={CreateVideoFormLabel.description}
          placeholder="Description"
          {...getInputProps(CreateVideoFormName.description)}
          error={errors[CreateVideoFormName.description]}
        />
        <UploadFileButton
          folder={MediaTypes.Video}
          label={CreateVideoFormLabel.url}
          placeholder="Select video"
          error={errors[CreateVideoFormName.url]}
          accept="video/*"
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
