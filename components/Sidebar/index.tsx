'use client';

import { useAuthContext } from '@/providers/authProvider';
import { MediaTypes } from '@/schema';
import { accessibleOnClick } from '@/utils';
import { Avatar, Button, Group, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFingerprint, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { FaEdit, FaRegMoon } from 'react-icons/fa';
import { FaChartLine, FaLink } from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';
import { HiPhotograph } from 'react-icons/hi';
import { MdLightbulbOutline, MdOutlineWbSunny } from 'react-icons/md';
import { PiMapTrifold } from 'react-icons/pi';
import { RiVideoLine } from 'react-icons/ri';
import { UpdateProfileModal } from '../UpdateProfileModal';
import classes from './sidebar.module.css';

const data = [
  {
    link: `/${MediaTypes.Credential}`,
    label: 'Credentials',
    icon: IconFingerprint,
    type: MediaTypes.Credential,
  },
  { link: `/${MediaTypes.Image}`, type: MediaTypes.Image, label: 'Photos', icon: HiPhotograph },
  { link: `/${MediaTypes.Video}`, type: MediaTypes.Video, label: 'Videos', icon: RiVideoLine },
  { link: `/${MediaTypes.Url}`, type: MediaTypes.Url, label: 'URLs', icon: FaLink },
  {
    link: `/${MediaTypes.NewIdea}`,
    type: MediaTypes.NewIdea,
    label: 'New idea',
    icon: MdLightbulbOutline,
  },
  {
    link: `/${MediaTypes.FutureGoal}`,
    type: MediaTypes.FutureGoal,
    label: 'Future goals',
    icon: GoGoal,
  },
  {
    link: `/${MediaTypes.CompanyGrowth}`,
    type: MediaTypes.CompanyGrowth,
    label: 'Company growth',
    icon: FaChartLine,
  },
  {
    link: `/${MediaTypes.OngoingProject}`,
    type: MediaTypes.OngoingProject,
    label: 'Ongoing project',
    icon: AiOutlineFire,
  },
  {
    link: `/${MediaTypes.Milestone}`,
    type: MediaTypes.Milestone,
    label: 'Milestone',
    icon: PiMapTrifold,
  },
];

export default function Sidebar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isEditProfileModalOpened, { open: openEditProfileModal, close: closeEditProfileModal }] =
    useDisclosure();
  const { handleLogout } = useAuthContext();
  const [active, setActive] = useState<string | null>(null);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const params = useParams();
  const { type } = params;

  useEffect(() => {
    if (typeof type === 'string') setActive(type);
    else setActive(null);
  }, [type]);

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.type === active || undefined}
      href={item.link}
      key={item.label}
      onClick={toggleSidebar}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Avatar src="/images/avatar.jpeg" size="xl" />
        <Button mt={18} onClick={openEditProfileModal} variant="" rightSection={<FaEdit />}>
          Edit profile
        </Button>
      </div>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <div {...accessibleOnClick(toggleColorScheme)} className={classes.link}>
          <Group>
            {colorScheme === 'light' ? (
              <>
                <span>
                  <FaRegMoon size={20} />
                </span>
                <span>Dark mode</span>
              </>
            ) : (
              <>
                <span>
                  <MdOutlineWbSunny size={20} />
                </span>{' '}
                <span>Light mode</span>
              </>
            )}
          </Group>
        </div>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            handleLogout();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
        {isEditProfileModalOpened === true ? (
          <UpdateProfileModal opened={isEditProfileModalOpened} onClose={closeEditProfileModal} />
        ) : null}
      </div>
    </nav>
  );
}
