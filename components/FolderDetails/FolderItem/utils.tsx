import { MediaTypes } from '@/schema';
import { AiOutlineAim } from 'react-icons/ai';
import { CiImageOn } from 'react-icons/ci';
import { FaFileVideo, FaLink } from 'react-icons/fa6';
import { GoProjectRoadmap } from 'react-icons/go';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LuScrollText } from 'react-icons/lu';
import { MdSecurity } from 'react-icons/md';
import { RiLineChartLine } from 'react-icons/ri';

export const FolderItemIcons: Record<MediaTypes, JSX.Element> = {
  [MediaTypes.CompanyGrowth]: <RiLineChartLine size={18} />,
  [MediaTypes.Credential]: <MdSecurity size={18} />,
  [MediaTypes.FutureGoal]: <AiOutlineAim size={18} />,
  [MediaTypes.Image]: <CiImageOn size={18} />,
  [MediaTypes.Milestone]: <IoMdCheckmarkCircleOutline size={18} />,
  [MediaTypes.NewIdea]: <LuScrollText size={18} />,
  [MediaTypes.OngoingProject]: <GoProjectRoadmap size={18} />,
  [MediaTypes.Url]: <FaLink size={18} />,
  [MediaTypes.Video]: <FaFileVideo size={18} />,
};
