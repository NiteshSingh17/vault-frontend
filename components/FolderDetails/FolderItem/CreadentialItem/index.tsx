import { useAuthContext } from '@/providers/authProvider';
import { Credential, Media, ViewTypes } from '@/schema';
import { accessibleOnClick } from '@/utils';
import {
  ActionIcon,
  Box,
  Button,
  ButtonGroup,
  CopyButton,
  Grid,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import dayjs from 'dayjs';
import { MouseEventHandler, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete, MdSecurity } from 'react-icons/md';
import classes from '../folderItem.module.css';
import { FolderItemIcons } from '../utils';

interface CredentialItemProps {
  data: Media;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function CredentialItem({
  data,
  onClick,
  onEdit,
  onDelete,
}: CredentialItemProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const { viewType } = useAuthContext();
  const handleDeleteIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onDelete();
  };
  const handleEditIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onEdit();
  };

  const content = data.content as Credential;

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
      <Box ml={-8}>
        <MdSecurity size={100} />
      </Box>
      <Text size="sm" lineClamp={1} style={{ wordBreak: 'break-all' }}>
        {data.title}
      </Text>
      <Box mt={20}>
        {isVisible === false ? (
          <Tooltip label="View credentials">
            <Button
              variant="outline"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(true);
              }}
            >
              <FaEye />
            </Button>
          </Tooltip>
        ) : (
          <Stack gap={10}>
            <CopyButton value={content.username}>
              {({ copied, copy }) => (
                <Button
                  size="xs"
                  variant="outline"
                  rightSection={<BiCopy />}
                  color={copied ? 'teal' : 'blue'}
                  onClick={(event) => {
                    event.stopPropagation();
                    copy();
                  }}
                >
                  {copied ? 'Copied username' : content.username}
                </Button>
              )}
            </CopyButton>
            <CopyButton value={content.password}>
              {({ copied, copy }) => (
                <Button
                  size="xs"
                  variant="outline"
                  rightSection={<BiCopy />}
                  color={copied ? 'teal' : 'blue'}
                  onClick={(event) => {
                    event.stopPropagation();
                    copy();
                  }}
                >
                  {copied ? 'Copied password' : content.password}
                </Button>
              )}
            </CopyButton>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
