'use client';

import { Routes } from '@/api';
import { useCreateFile, useUpdateFile } from '@/api/hook';
import { CreateMediaPayload } from '@/api/payload';
import { Media, MediaTypes } from '@/schema';
import { Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { CompanyGrowthForm } from './Forms/CompanyGrowth';
import { CredentialForm } from './Forms/Crendential';
import { FutureGoalsForm } from './Forms/FutureGoals';
import { ImageForm } from './Forms/Image';
import { MilestoneForm } from './Forms/MileStones';
import { NewIdeaForm } from './Forms/NewIdea';
import { OngoingProjectForm } from './Forms/OngoingProject';
import { URLForm } from './Forms/Url';
import { VideoForm } from './Forms/Video';

interface AddNewItemModalProps {
  type: MediaTypes;
  opened: boolean;
  defaultData?: Media;
  parentID?: string | null;
  onClose: () => void;
}

export function AddNewItemModal({
  type,
  defaultData,
  opened,
  parentID,
  onClose,
}: AddNewItemModalProps): JSX.Element {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateFile({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Routes.GetFile],
      });
      onClose();
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

  const handleCreateFile = (data: CreateMediaPayload) => {
    if (typeof defaultData?._id === 'string') {
      updateMedia({ params: { ...data }, id: defaultData._id });
    } else mutate({ ...data, parentID });
  };

  const uiDictionary: Record<(typeof MediaTypes)[keyof typeof MediaTypes], JSX.Element> = {
    [MediaTypes.Credential]: (
      <CredentialForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.CompanyGrowth]: (
      <CompanyGrowthForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.FutureGoal]: (
      <FutureGoalsForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.Image]: (
      <ImageForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.Milestone]: (
      <MilestoneForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.NewIdea]: (
      <NewIdeaForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.OngoingProject]: (
      <OngoingProjectForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.Url]: (
      <URLForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
    [MediaTypes.Video]: (
      <VideoForm
        defaultData={defaultData}
        isLoading={isPending || isUpdatingMedia}
        onSave={handleCreateFile}
      />
    ),
  };

  const modalWidth =
    type === MediaTypes.CompanyGrowth || MediaTypes.NewIdea || type === MediaTypes.FutureGoal
      ? 'xl'
      : type === MediaTypes.Milestone
        ? 'lg'
        : 'md';

  return (
    <Modal size={modalWidth} opened={opened} onClose={onClose} centered>
      {uiDictionary[type]}
    </Modal>
  );
}
