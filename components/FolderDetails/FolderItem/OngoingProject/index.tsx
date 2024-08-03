import { useAuthContext } from '@/providers/authProvider';
import { Media, Project, ViewTypes } from '@/schema';
import { accessibleOnClick } from '@/utils';
import { ActionIcon, Box, ButtonGroup, Chip, Grid, Stack, Text, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import { MouseEventHandler } from 'react';
import { FaEdit } from 'react-icons/fa';
import { GoProjectRoadmap } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import classes from '../folderItem.module.css';
import { FolderItemIcons } from '../utils';

interface OngoingProjectItemProps {
  data: Media;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function OngoingProjectItem({
  data,
  onClick,
  onEdit,
  onDelete,
}: OngoingProjectItemProps): JSX.Element {
  const { viewType } = useAuthContext();

  const handleDeleteIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onDelete();
  };
  const handleEditIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onEdit();
  };
  const content = data.content as Project;
  const totalDays = dayjs(content.endDate).diff(dayjs(content.startDate), 'day');
  const completedDays = totalDays - dayjs(content.endDate).diff(new Date(), 'day');
  const percent = (completedDays / totalDays) * 100;
  console.log('diffrence', completedDays, percent, totalDays);
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
    <Stack gap={4} onClick={onClick}>
      <Box ml={-8}>
        <GoProjectRoadmap size={100} />
      </Box>
      <Text size="sm" lineClamp={1} style={{ wordBreak: 'break-all' }}>
        {data.title}
      </Text>
      <Chip size="xs">{content.installments?.length ?? 0} installments</Chip>
      {typeof content.startDate === 'string' && typeof content.endDate === 'string' ? (
        <Tooltip
          position="bottom"
          label={`${dayjs(content.startDate).format('DD MMM,YYYY')} - ${dayjs(content.endDate).format('DD MMM,YYYY')}`}
        >
          <Box mt={8}>
            <Box p={2} w="100%">
              <Box
                h={4}
                style={{ borderRadius: '5px' }}
                w={`${percent}%`}
                bg={percent > 80 ? 'green' : percent > 40 ? 'blue' : 'gray'}
              />
            </Box>
          </Box>
        </Tooltip>
      ) : null}
    </Stack>
  );
}
