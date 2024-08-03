'use client';

import { useAuthContext } from '@/providers/authProvider';
import { Media, ViewTypes } from '@/schema';
import { Box, Button, Divider, Group, Stack, Text } from '@mantine/core';
import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import classes from './contextMenu.module.css';

interface ContextMenuWrapperProps {
  data: Media;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ContextMenuWrapper = ({
  data,
  children,
  onEdit,
  onDelete,
  ...props
}: PropsWithChildren & ContextMenuWrapperProps) => {
  const { viewType } = useAuthContext();
  const [contextMenuDetails, setContextMenuDetails] = useState({
    show: false,
    x: 0,
    y: 0,
  });

  const hideContextMenu = useCallback(() => {
    setContextMenuDetails({
      show: false,
      x: 0,
      y: 0,
    });
  }, [setContextMenuDetails]);

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setContextMenuDetails({
      x: e.pageX,
      y: e.pageY,
      show: true,
    });
  };

  useEffect(() => {
    window.addEventListener('click', hideContextMenu);
    () => window.removeEventListener('click', hideContextMenu);
  }, [hideContextMenu]);

  const actions = useMemo(
    () => [
      // {
      //   icon: <MdOutlineKeyboardArrowUp size={20} />,
      //   label: 'Copy',
      //   actionHandle: console.log,
      // },
      // {
      //   icon: <MdOutlineKeyboardDoubleArrowUp size={20} />,
      //   label: 'Cut',
      //   actionHandle: console.log,
      // },
      // {
      //   icon: <MdOutlineKeyboardArrowDown size={20} />,
      //   label: 'Paste',
      //   actionHandle: console.log,
      // },

      {
        icon: <FaEdit size={20} />,
        label: 'Edit',
        actionHandle: onEdit,
      },
    ],
    [onEdit]
  );

  return (
    <Box
      {...props}
      p={viewType === ViewTypes.Grid ? 10 : 0}
      w={viewType === ViewTypes.Grid ? { base: '50%', md: '20%', lg: '12%' } : {}}
      onContextMenu={onContextMenu}
      style={{ cursor: 'pointer' }}
    >
      {children}
      {contextMenuDetails.show === true && (
        <Stack
          px={8}
          py={12}
          gap={6}
          pos="fixed"
          top={contextMenuDetails.y}
          left={contextMenuDetails.x}
          w={240}
          className={classes.item}
        >
          {actions.map((action) => (
            <Button
              variant="subtle"
              w="100%"
              justify="start"
              color="gray"
              key={action.label}
              onClick={action.actionHandle}
            >
              <Group align="center">
                <Box>{action.icon}</Box>
                <Text size="md">{action.label}</Text>
              </Group>
            </Button>
          ))}
          <Divider my={2} />
          <Button
            onClick={onDelete}
            variant="subtle"
            w="100%"
            justify="start"
            color="red"
            leftSection={<MdDelete size={20} />}
          >
            <Text>Delete</Text>
          </Button>
        </Stack>
      )}
    </Box>
  );
};
