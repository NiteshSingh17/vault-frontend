'use client';

import { Routes } from '@/api';
import { useCreateFile, useUpdateFile } from '@/api/hook';
import { FileTypes, MediaTypes } from '@/schema';
import { Alert, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface CreateFolderModalPropos {
  type: MediaTypes;
  opened: boolean;
  parentId?: string | null;
  id?: string;
  defaultTile?: string;
  onClose: () => void;
}

export function CreateFolderModal({
  type,
  opened,
  parentId,
  id,
  defaultTile,
  onClose,
}: CreateFolderModalPropos): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateFile({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Routes.GetFile] });
      onClose();
    },
    onError: ({ response }) => {
      setErrorMessage(response?.data.message ?? 'something went wrong');
    },
  });

  const { mutate: updateMedia, isPending: isUpdatingMedia } = useUpdateFile({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Routes.GetFile],
      });
      onClose();
    },
  });

  const { errors, onSubmit, getInputProps } = useForm({
    initialValues: {
      title: defaultTile ?? '',
    },
  });

  const handleSubmit = (data: { title: string }) => {
    if (typeof id === 'string') {
      updateMedia({
        id,
        params: data,
      });
    } else {
      mutate({ ...data, fileType: FileTypes.Folder, type, parentID: parentId, content: undefined });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack>
          {typeof errorMessage === 'string' ? (
            <Alert mb={10} icon={<FaInfoCircle />} color="red">
              {errorMessage}
            </Alert>
          ) : null}
          <TextInput
            label="Name"
            placeholder="name"
            {...getInputProps('title')}
            error={errors.title}
          />
          <Button loading={isPending || isUpdatingMedia} type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
