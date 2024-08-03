import { DropdownProps } from '@/components/Dropdown';
import { Media, Project, projectSchema } from '@/schema';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaHtml5, FaReact, FaSwift } from 'react-icons/fa';
import { IoLogoAndroid } from 'react-icons/io';
import { IoLogoCss3 } from 'react-icons/io5';
import { RiJavascriptFill } from 'react-icons/ri';
import { SiNextdotjs, SiPhp } from 'react-icons/si';
import { TbBrandNodejs } from 'react-icons/tb';
import z from 'zod';

export const CreateOngoingProjectFormSchema = projectSchema.extend({
  title: z.string().min(1),
  description: z.string().nullish(),
});

export type CreateOngoingProjectForm = z.infer<typeof CreateOngoingProjectFormSchema>;

export const CreateOngoingProjectFormLabel: Record<keyof CreateOngoingProjectForm, string> = {
  title: 'Title',
  description: 'Description',
  startDate: 'Start Date',
  endDate: 'End Date',
  freelancerName: 'Freelancer name',
  freelancerURL: 'Freelancer profile url',
  installments: 'Installments',
  totalAmount: 'Total amount',
  stack: 'Stack',
  hiringPlatform: 'Hiring Platform',
};

export const CreateOngoingProjectFormName: Record<
  keyof CreateOngoingProjectForm,
  keyof CreateOngoingProjectForm
> = {
  title: 'title',
  startDate: 'startDate',
  endDate: 'endDate',
  freelancerName: 'freelancerName',
  freelancerURL: 'freelancerURL',
  installments: 'installments',
  totalAmount: 'totalAmount',
  description: 'description',
  stack: 'stack',
  hiringPlatform: 'hiringPlatform',
};

export function getCreateOngoingProjectFormInitialValue(data?: Media): CreateOngoingProjectForm {
  const projectContent = data?.content as Project | undefined;
  return {
    startDate: projectContent?.startDate ?? new Date().toISOString(),
    title: data?.title ?? '',
    totalAmount: projectContent?.totalAmount ?? 0,
    endDate: projectContent?.endDate ?? null,
    freelancerName: projectContent?.freelancerName ?? '',
    freelancerURL: projectContent?.freelancerURL ?? '',
    description: data?.description ?? null,
    stack: projectContent?.stack ?? [],
    installments: projectContent?.installments ?? [
      {
        amount: 0,
        name: 'Installment 1',
        endDate: new Date().toISOString(),
        description: null,
      },
    ],
    hiringPlatform: '',
  };
}

export const FrameworkNames: DropdownProps['data'] = [
  {
    title: 'Javascript',
    value: 'javascript',
    icon: <RiJavascriptFill />,
  },
  {
    title: 'Typescript',
    value: 'typescript',
    icon: <BiLogoTypescript />,
  },
  {
    title: 'PHP',
    value: 'php',
    icon: <SiPhp />,
  },
  {
    title: 'Next.js',
    value: 'nextjs',
    icon: <SiNextdotjs />,
  },
  {
    title: 'HTMl',
    value: 'html',
    icon: <FaHtml5 />,
  },
  {
    title: 'Css',
    value: 'css',
    icon: <IoLogoCss3 />,
  },
  {
    title: 'React',
    value: 'react',
    icon: <FaReact />,
  },
  {
    title: 'Android',
    value: 'android',
    icon: <IoLogoAndroid />,
  },
  {
    title: 'Swift',
    value: 'swift',
    icon: <FaSwift />,
  },
  {
    title: 'Node.js',
    value: 'nodejs',
    icon: <TbBrandNodejs />,
  },
];
