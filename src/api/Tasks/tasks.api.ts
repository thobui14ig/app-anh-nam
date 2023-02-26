import http from '../http';

export default interface TaskType {
  _id: string;
  title: string;
  description: string;
  startDay: string;
  endDay: string;
  assigne: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const insertTask = (values: any) => http.post(`/tasks`, values);
export const updateTask = (key: string, values: any) =>
  http.patch(`/tasks/${key}`, values);
export const getTasks = () => http.get<any>(`/tasks`);
export const deleteTasks = (key: string) => http.delete<any>(`/tasks/${key}`);
export const uploadReport = (values: any) => http.post(`/tasks/upload-report`, values);
