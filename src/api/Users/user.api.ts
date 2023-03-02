import USER_TYPE from '../../type/user.type';
import http from '../http';

export const getUsers = () => http.get<USER_TYPE>(`/users`);

export const insertUser = (values: any) => http.post(`/users`, values);
export const updateUser = (key: string, values: any) =>
  http.patch(`/users/${key}`, values);
export const deleteUser = (key: string) => http.delete<any>(`/users/${key}`);
