'use client';

import { useGetFile, useGetFileDetail } from '@/api/hook';
import { AddNewItemModal } from '@/components/AddNewItemModal';
import { CreateFolderModal } from '@/components/CreateFolderModal';
import { EmptyBox } from '@/components/EmptyContent/EmptyBox';
import { FolderDetails } from '@/components/FolderDetails';
import { MediaTypes } from '@/schema';
import { Button, Divider, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaFile, FaFolder } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';

export default function MediaDetail(): JSX.Element {
  const params = useParams();
  const [
    isCreateFolderModalOpened,
    { open: openCreateFolderModal, close: closeCreateFolderModal },
  ] = useDisclosure();
  const [isCreateFileModalOpened, { open: openCreateFileModal, close: closeCreateFileModal }] =
    useDisclosure();
  const { mediaId, type } = params;
  const parentId = mediaId?.at(0) ?? 'root';
  const { data: mediaFiles } = useGetFile({
    fileId: parentId,
    params: {
      type: type as MediaTypes,
    },
  });

  const { data: fileDetail } = useGetFileDetail(mediaId?.at(0));

  return (
    <Stack gap={20} h="100%" py={10} px={10}>
      <Group justify="space-between">
        {mediaId === undefined ? (
          <span />
        ) : (
          <Link href={`/${type}/${fileDetail?.parentID ?? ''}`}>
            <Button w="fit-content" variant="subtle" color="gray" leftSection={<MdArrowBack />}>
              Back
            </Button>
          </Link>
        )}
        {Array.isArray(mediaFiles) && mediaFiles?.length > 0 ? (
          <Group>
            <Button leftSection={<FaFile />} onClick={openCreateFileModal}>
              Create new item
            </Button>
            <Button leftSection={<FaFolder />} onClick={openCreateFolderModal}>
              Create folder
            </Button>
          </Group>
        ) : null}
      </Group>
      <Divider />
      {Array.isArray(mediaFiles) && mediaFiles?.length < 1 ? (
        <EmptyBox onAddFolder={openCreateFolderModal} onAddFile={openCreateFileModal} />
      ) : (
        <FolderDetails data={mediaFiles ?? []} />
      )}
      {isCreateFolderModalOpened === true ? (
        <CreateFolderModal
          type={type as MediaTypes}
          parentId={mediaId?.at(0) ?? null}
          opened={isCreateFolderModalOpened}
          onClose={closeCreateFolderModal}
        />
      ) : null}
      {isCreateFileModalOpened === true ? (
        <AddNewItemModal
          type={type as MediaTypes}
          parentID={mediaId?.at(0) ?? null}
          opened={isCreateFileModalOpened}
          onClose={closeCreateFileModal}
        />
      ) : null}
    </Stack>
  );
}
