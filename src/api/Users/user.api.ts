import USER_TYPE from '../../type/user.type';
import http from '../http';

export const getUsers = () => http.get<USER_TYPE>(`/users`);

export const insertUser = (values: any) => http.post(`/users`, values);
export const updateUser = (key: string, values: any) =>
  http.patch(`/users/${key}`, values);
export const deleteUser = (key: string) => http.delete<any>(`/users/${key}`);

export const getUser = (id: string) => http.get<USER_TYPE>(`/users/${id}`);

export const createRoles = (values: any) => http.post<any>(`role/set-roles`, values);

export const getRoles = (id: string) => http.get<any>(`/role/${id}`);
