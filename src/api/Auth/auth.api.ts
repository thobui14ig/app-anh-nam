import http from '../http';

interface ResponseLogin {
  refreshToken: string;
  accessToken: string;
  user: UserInfoType;
}
export interface UserInfoType {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  refreshToken: string;
}

const refresh = localStorage.getItem('refreshToken');
export const login = (user: { name: string; password: string }) =>
  http.post<ResponseLogin>('/auth/login', user);

export const refreshToken = () =>
  http.post('/auth/refresh', {
    refreshToken: refresh,
  });
