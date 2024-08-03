import { Media, User } from '@/schema';
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { API, Routes } from './index';
import {
  CreateMediaPayload,
  GetFilesPayload,
  LoginPayload,
  UpdateMediaPayload,
  UpdateUserPayload,
} from './payload';
import { ErrorResponse, LoginResponse, UploadMediaFileResponse } from './response';

export function useLogin(
  params: UseMutationOptions<AxiosResponse<LoginResponse>, AxiosError<ErrorResponse>, LoginPayload>
): UseMutationResult<AxiosResponse<LoginResponse>, AxiosError<ErrorResponse>, LoginPayload> {
  return useMutation({
    mutationFn: API.Login,
    ...params,
  });
}

export function useUpdateUser(
  params: UseMutationOptions<AxiosResponse<User>, AxiosError<ErrorResponse>, UpdateUserPayload>
): UseMutationResult<AxiosResponse<User>, AxiosError<ErrorResponse>, UpdateUserPayload> {
  return useMutation({
    mutationFn: API.UpdateUser,
    ...params,
  });
}

// Ref: https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries#usequery-dependent-query
export function useAuthMe(enabled?: boolean): UseQueryResult<User, AxiosError<ErrorResponse>> {
  return useQuery({
    queryKey: [Routes.AuthMe],
    queryFn: async (): Promise<User> => {
      const { data } = await API.AuthMe();
      return data;
    },
    enabled,
  });
}

export function useGetFile(
  params: GetFilesPayload
): UseQueryResult<Media[], AxiosError<ErrorResponse>> {
  return useQuery({
    queryKey: [Routes.GetFile, params],
    queryFn: async (): Promise<Media[]> => {
      const { data } = await API.GetFile(params);
      return data;
    },
  });
}

export function useCreateFile(
  params: UseMutationOptions<AxiosResponse<Media>, AxiosError<ErrorResponse>, CreateMediaPayload>
): UseMutationResult<AxiosResponse<Media>, AxiosError<ErrorResponse>, CreateMediaPayload> {
  return useMutation({
    mutationFn: API.CreateFile,
    ...params,
  });
}

export function useDeleteFile(
  params: UseMutationOptions<AxiosResponse<Media>, AxiosError<ErrorResponse>, string>
): UseMutationResult<AxiosResponse<Media>, AxiosError<ErrorResponse>, string> {
  return useMutation({
    mutationFn: API.DeleteFile,
    ...params,
  });
}

export function useGetFileDetail(
  fileId?: string
): UseQueryResult<Media, AxiosError<ErrorResponse>> {
  return useQuery({
    queryKey: [Routes.GetFile, fileId],
    queryFn: async (): Promise<Media | undefined> => {
      if (typeof fileId === 'string') {
        const { data } = await API.GetFileDetail(fileId);
        return data;
      }
      return undefined;
    },
  });
}

export function useUpdateFile(
  params: UseMutationOptions<AxiosResponse<Media>, AxiosError<ErrorResponse>, UpdateMediaPayload>
): UseMutationResult<AxiosResponse<Media>, AxiosError<ErrorResponse>, UpdateMediaPayload> {
  return useMutation({
    mutationFn: API.UpdateFileDetail,
    ...params,
  });
}

export function useUploadMediaFiles(
  params: UseMutationOptions<
    AxiosResponse<UploadMediaFileResponse>,
    AxiosError<ErrorResponse>,
    FormData
  >
): UseMutationResult<AxiosResponse<UploadMediaFileResponse>, AxiosError<ErrorResponse>, FormData> {
  return useMutation({
    mutationFn: API.UploadMediaFiles,
    ...params,
  });
}
