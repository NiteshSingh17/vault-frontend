'use client';

import { Routes } from '@/api';
import { useDeleteFile } from '@/api/hook';
import { AddNewItemModal } from '@/components/AddNewItemModal';
import { CreateFolderModal } from '@/components/CreateFolderModal';
import { PreviewModal } from '@/components/Preview';
import { WithTooltip } from '@/components/WithTooltip';
import { useAuthContext } from '@/providers/authProvider';
import { FileTypes, Media, MediaTypes, URLData, ViewTypes } from '@/schema';
import { accessibleOnClick } from '@/utils';
import { ActionIcon, Box, ButtonGroup, Grid, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback } from 'react';
import { FaEdit, FaFolder } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ContextMenuWrapper } from '../ContextMenu';
import { CompanyGrowth } from './CompanyGrowth';
import { CredentialItem } from './CreadentialItem';
import { FutureGoalItem } from './FutureGoal';
import { ImageItem } from './ImageItem';
import { MilestoneItem } from './Milestone';
import { NewIdeaItem } from './NewIdeaItem';
import { OngoingProjectItem } from './OngoingProject';
import { URLsItem } from './URLs';
import { ViewItem } from './VideItem';
import classes from './folderItem.module.css';

export function FolderItem({ data }: { data: Media }): JSX.Element {
  const { viewType } = useAuthContext();
  const isFolder = data.fileType === FileTypes.Folder;
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: deleteFile } = useDeleteFile({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Routes.GetFile] });
    },
  });

  const [isCreateFileModalOpened, { open: openCreateFileModal, close: closeCreateFileModal }] =
    useDisclosure();

  const [isPreviewModalOpened, { open: openPreviewModal, close: closePreviewModal }] =
    useDisclosure();

  const handleClick = () => {
    if (isFolder) {
      router.push(`/${data.type}/${data._id}`);
    } else if (
      data.type === MediaTypes.Image ||
      data.type === MediaTypes.Video ||
      data.type === MediaTypes.NewIdea ||
      data.type === MediaTypes.FutureGoal ||
      data.type === MediaTypes.Milestone ||
      data.type === MediaTypes.CompanyGrowth
    ) {
      openPreviewModal();
    } else if (data.type === MediaTypes.Url) {
      window.open((data.content as URLData | undefined)?.url);
    } else {
      openCreateFileModal();
    }
  };

  const deleteHandler = useCallback(() => {
    deleteFile(data._id);
  }, [deleteFile]);

  const handleEditIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    openCreateFileModal();
  };

  const handleDeleteIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    deleteHandler();
  };

  const uiDictionary: Record<MediaTypes, JSX.Element> = {
    [MediaTypes.Credential]: (
      <CredentialItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.CompanyGrowth]: (
      <CompanyGrowth
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.FutureGoal]: (
      <FutureGoalItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.Image]: (
      <ImageItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.Milestone]: (
      <MilestoneItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.NewIdea]: (
      <NewIdeaItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.OngoingProject]: (
      <OngoingProjectItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.Url]: (
      <URLsItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
    [MediaTypes.Video]: (
      <ViewItem
        data={data}
        onClick={handleClick}
        onDelete={deleteHandler}
        onEdit={openCreateFileModal}
      />
    ),
  };

  return (
    <ContextMenuWrapper onDelete={deleteHandler} onEdit={openCreateFileModal} data={data}>
      <Box pos="relative">
        <WithTooltip label={data.description ?? ''} position="bottom-start">
          <div>
            {isFolder === true ? (
              viewType === ViewTypes.Grid ? (
                <Stack {...accessibleOnClick(handleClick)} align="stretch">
                  <FaFolder size={78} />
                  <Text size="sm" lineClamp={1} style={{ wordBreak: 'break-all' }}>
                    {data.title}
                  </Text>
                </Stack>
              ) : (
                <Grid
                  {...accessibleOnClick(handleClick)}
                  className={classes.item}
                  py={8}
                  px={8}
                  align="center"
                >
                  <Grid.Col py={0} h={18} span="content">
                    <FaFolder size={18} />
                  </Grid.Col>
                  <Grid.Col color="gray" span="auto">
                    <Text size="sm">{data.title}</Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Text size="sm">{dayjs(data.updateAt).format('DD MMM YYYY')}</Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <ButtonGroup>
                      <Tooltip label="Edit">
                        <ActionIcon onClick={handleEditIconClick} variant="subtle">
                          <FaEdit />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon onClick={handleDeleteIconClick} color="orange" variant="subtle">
                          <MdDelete />
                        </ActionIcon>
                      </Tooltip>
                    </ButtonGroup>
                  </Grid.Col>
                </Grid>
              )
            ) : (
              uiDictionary[data.type]
            )}
          </div>
        </WithTooltip>
      </Box>
      {isCreateFileModalOpened === true ? (
        data.fileType === FileTypes.Folder ? (
          <CreateFolderModal
            onClose={closeCreateFileModal}
            opened={isCreateFileModalOpened}
            type={data.type}
            defaultTile={data.title}
            id={data._id}
          />
        ) : (
          <AddNewItemModal
            defaultData={data}
            type={data.type}
            opened={isCreateFileModalOpened}
            onClose={closeCreateFileModal}
          />
        )
      ) : null}
      {isPreviewModalOpened === true ? (
        <PreviewModal media={data} opened={isPreviewModalOpened} onClose={closePreviewModal} />
      ) : null}
    </ContextMenuWrapper>
  );
}
