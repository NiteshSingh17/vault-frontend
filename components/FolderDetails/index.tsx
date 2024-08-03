import { useAuthContext } from '@/providers/authProvider';
import { ActionIcon, Box, Divider, Group, Tooltip } from '@mantine/core';
import { Fragment } from 'react';
import { CiCircleList } from 'react-icons/ci';
import { IoGrid } from 'react-icons/io5';
import { Media, ViewTypes } from '../../schema';
import { FolderItem } from './FolderItem';

export function FolderDetails({ data }: { data: Media[] }) {
  const { viewType, setViewType } = useAuthContext();

  return (
    <Box w="100%">
      <Group gap={0}>
        <Tooltip label="Grid">
          <ActionIcon
            onClick={() => setViewType(ViewTypes.Grid)}
            variant={viewType === ViewTypes.Grid ? 'filled' : 'subtle'}
          >
            <IoGrid />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="List">
          <ActionIcon
            onClick={() => setViewType(ViewTypes.List)}
            variant={viewType === ViewTypes.List ? 'filled' : 'subtle'}
          >
            <CiCircleList />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Box
        w="100%"
        mt={20}
        display={viewType === ViewTypes.Grid ? 'flex' : 'block'}
        style={{ flexWrap: 'wrap' }}
      >
        {data.map((item) => (
          <Fragment key={item._id}>
            <FolderItem data={item} />
            {viewType === ViewTypes.List ? <Divider /> : null}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
