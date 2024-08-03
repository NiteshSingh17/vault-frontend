export interface ErrorResponse {
  message: string;
}

export interface LoginResponse {
  token: string;
}

export interface UploadMediaFileResponse {
  message: string;
  fileURL: string;
}
