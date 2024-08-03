import { Media, User } from '@/schema';
import axios from 'axios';
import {
  CreateMediaPayload,
  GetFilesPayload,
  LoginPayload,
  UpdateMediaPayload,
  UpdateUserPayload,
} from './payload';
import { LoginResponse, UploadMediaFileResponse } from './response';

export function getApiBaseUrl(): string {
  return 'https://vault-backend-11zb.onrender.com/';
}

const API_BASE_URL = getApiBaseUrl();

export const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const Routes = {
  /* Authentication */
  Login: 'user/login',
  AuthMe: 'user/me',
  UpdateUser: 'user/update',

  /* Files */
  GetFile: 'file',
  CreateFile: 'file',
  DeleteFile: 'file',
  GetFileDetail: 'file/detail',
  UpdateFileDetail: 'file',

  /* Uploads */
  UploadMediaFiles: 'upload/media',
};

export const API = {
  /* Authentication */
  Login: (params: LoginPayload) => AxiosInstance.post<LoginResponse>(Routes.Login, params),
  AuthMe: () => AxiosInstance.post<User>(Routes.AuthMe),
  UpdateUser: (data: UpdateUserPayload) => AxiosInstance.patch<User>(Routes.UpdateUser, data),
  /* Fille */
  GetFile: (params: GetFilesPayload) =>
    AxiosInstance.get<Media[]>(`${Routes.GetFile}/${params.fileId}`, { params: params.params }),
  CreateFile: (params: CreateMediaPayload) => AxiosInstance.post<Media>(Routes.CreateFile, params),
  DeleteFile: (fileId: string) => AxiosInstance.delete<Media>(`${Routes.DeleteFile}/${fileId}`),
  GetFileDetail: (fileId: string) => AxiosInstance.get<Media>(`${Routes.GetFileDetail}/${fileId}`),
  UpdateFileDetail: (params: UpdateMediaPayload) =>
    AxiosInstance.patch<Media>(`${Routes.UpdateFileDetail}/${params.id}`, params.params),

  /* Uploads */
  UploadMediaFiles: (params: FormData) =>
    AxiosInstance.post<UploadMediaFileResponse>(
      `${Routes.UploadMediaFiles}/${params.get('folder')}`,
      params,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ),
};
