import { omit } from 'lodash';
import { AxiosInstance } from '.';

export function setAuthorizationHeader(accessToken: string) {
  AxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export function removeAuthorizationHeader() {
  AxiosInstance.defaults.headers.common = omit(
    AxiosInstance.defaults.headers.common,
    'Authorization'
  );
}
