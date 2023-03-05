import http from '../http';
import { CREATEBY } from './../../type/resource-type';

interface UserOnlineType {
  _id: string;
  messages: string[];
  users: string[];
  type: string;
  name: string;
}

export interface MessagesType {
  _id: string;
  messages: MessageType[];
  type: string;
}

export interface MessageType {
  _id: string;
  createdAt: Date;
  content: string;
  createdBy: CREATEBY;
}

export const getRoom = (id: string) =>
  http.get<UserOnlineType>(`/chat-room/get-room/${id}`);

export const getCurrentChat = (id: string) =>
  http.get<UserOnlineType>(`/chat-room/create-room/${id}`);

export const sendMessage = (values: any) =>
  http.post<any>(`/chat-room/send-message`, values);

export const getMessages = (roomId: string) =>
  http.get<MessagesType>(`/chat-room/get-messages/${roomId}`);

export const getListChatUser = (userId: string) =>
  http.get<any>(`/chat-room/list-rooms/${userId}`);

export const createGroupChat = (values: any) =>
  http.post<any>(`/chat-room/create-group`, values);

export const removeMessage = (id: string, roomId: string) =>
  http.delete<any>(`/chat-room/remove-message/${id}/${roomId}`);

export const getUsersInRoom = (roomId: string) =>
  http.get<any>(`/chat-room/get-users/${roomId}`);
