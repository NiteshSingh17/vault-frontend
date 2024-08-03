import z from 'zod';

export const ViewTypes = {
  List: 'list',
  Grid: 'grid',
};
export type ViewTypes = (typeof ViewTypes)[keyof typeof ViewTypes];

export const MediaTypes = {
  Credential: 'credential',
  Image: 'image',
  Video: 'video',
  Url: 'url',
  NewIdea: 'newIdea',
  FutureGoal: 'futureGoal',
  CompanyGrowth: 'companyGrowth',
  OngoingProject: 'ongoingProject',
  Milestone: 'milestone',
} as const;
export type MediaTypes = (typeof MediaTypes)[keyof typeof MediaTypes];

export const FileTypes = {
  File: 'file',
  Folder: 'folder',
};

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string().min(1),
  password: z.string().min(1),
  createdAt: z.string().datetime(),
  updateAt: z.string().datetime(),
});

export const credentialSchema = z.object({
  url: z.string().url(),
  username: z.string().min(1),
  password: z.string().min(1),
});

export const CompanyGrowthSchema = z.object({
  message: z.string().min(1),
});

export const projectSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime().nullish(),
  totalAmount: z.number(),
  freelancerName: z.string().min(1),
  freelancerURL: z.string().url().nullish(),
  hiringPlatform: z.string(),
  installments: z.array(
    z.object({
      name: z.string().min(1),
      amount: z.number(),
      endDate: z.string().datetime(),
      description: z.string().nullish(),
    })
  ),
  stack: z.array(z.string()),
});

export const MilestoneSchema = z.object({
  currentStep: z.number(),
  steps: z.array(
    z.object({
      title: z.string().nullish(),
      date: z.string().datetime().nullish(),
      amount: z.number(),
      description: z.string().nullish(),
    })
  ),
});

export const ImageSchema = z.object({
  url: z.string().min(1),
});

export const VideoSchema = z.object({
  url: z.string().min(1),
});

export const URLSchema = z.object({
  url: z.string().min(1),
});

export const NewIdeaSchema = z.object({
  htmlContent: z.string(),
});

export const FutureGoalSchema = z.object({
  htmlContent: z.string(),
});

export const MediaSchema = z.object({
  _id: z.string(),
  title: z.string().min(1),
  description: z.string().nullish(),
  type: z.nativeEnum(MediaTypes),
  fileType: z.nativeEnum(FileTypes),
  content: z
    .union([
      credentialSchema,
      CompanyGrowthSchema,
      projectSchema,
      MilestoneSchema,
      ImageSchema,
      VideoSchema,
      URLSchema,
      NewIdeaSchema,
      FutureGoalSchema,
    ])
    .nullish(),
  parentID: z.string().nullish(),
  createdAt: z.string().datetime(),
  updateAt: z.string().datetime(),
});

export type Credential = z.infer<typeof credentialSchema>;
export type CompanyGrowth = z.infer<typeof CompanyGrowthSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Milestone = z.infer<typeof MilestoneSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type URLData = z.infer<typeof URLSchema>;
export type NewIdea = z.infer<typeof NewIdeaSchema>;
export type FutureGoal = z.infer<typeof FutureGoalSchema>;
export type User = z.infer<typeof UserSchema>;
