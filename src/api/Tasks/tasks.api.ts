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
export const getTasks = () => http.get<TaskType[]>(`/tasks`);
