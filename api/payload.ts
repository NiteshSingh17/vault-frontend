import { Media, MediaTypes } from '@/schema';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UpdateUserPayload {
  username: string;
  newPassword: string;
  oldPassword: string;
}

export interface GetFilesPayload {
  fileId: string;
  params?: {
    type: MediaTypes;
  };
}

export interface CreateMediaPayload {
  title: Media['title'];
  content?: Media['content'];
  type: Media['type'];
  fileType: Media['fileType'];
  parentID?: Media['parentID'];
  description?: Media['description'];
}

export interface UpdateMediaPayload {
  id: Media['title'];
  params: Partial<CreateMediaPayload>;
}
