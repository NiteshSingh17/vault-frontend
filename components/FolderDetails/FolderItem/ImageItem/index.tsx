import { useAuthContext } from '@/providers/authProvider';
import { Image as ImageType, Media, ViewTypes } from '@/schema';
import { accessibleOnClick, getMediaURL } from '@/utils';
import { ActionIcon, Box, ButtonGroup, Grid, Image, Text, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import { MouseEventHandler } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import classes from '../folderItem.module.css';
import { FolderItemIcons } from '../utils';

interface ImageItemProps {
  data: Media;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function ImageItem({ data, onClick, onEdit, onDelete }: ImageItemProps): JSX.Element {
  const { viewType } = useAuthContext();

  const handleDeleteIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onDelete();
  };
  const handleEditIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onEdit();
  };
  return viewType === ViewTypes.List ? (
    <Grid {...accessibleOnClick(onClick)} className={classes.item} py={8} px={8} align="center">
      <Grid.Col py={0} h={18} span="content">
        {FolderItemIcons[data.type]}
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
  ) : (
    <Box onClick={onClick}>
      <Image
        radius="md"
        h={150}
        w="100%"
        fit="contain"
        src={getMediaURL((data.content as ImageType).url)}
      />

      <Text size="sm" lineClamp={1} style={{ wordBreak: 'break-all' }}>
        {data.title}
      </Text>
    </Box>
  );
}
