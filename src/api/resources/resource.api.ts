import TASK from '../../type/resource-type';
import http from '../http';

export const addResource = (student: any) => http.post('/resources/insert', student);

export const getResource = () => http.get('/resources/team/12');

export const getMenus = () => http.get('/resources/menus');

export const getTeam = (id: string) => http.get(`/resources/team/${id}`);

export const getProject = (id: string) => http.get(`/resources/project/${id}`);

export const getComment = (id: string) => http.get<TASK>(`/resources/task/${id}`);
