import http from '../http';
import { CREATEBY } from './../../type/resource-type';

interface UserOnlineType {
  _id: string;
  messages: string[];
  users: string[];
}

export interface MessagesType {
  _id: string;
  messages: MessageType[];
}

export interface MessageType {
  _id: string;
  content: string;
  createdBy: CREATEBY;
}

export const getCurrentChat = (id: string) =>
  http.get<UserOnlineType>(`/chat-room/create-room/${id}`);

export const sendMessage = (values: any) =>
  http.post<any>(`/chat-room/send-message`, values);

export const getMessages = (roomId: string) =>
  http.get<MessagesType>(`/chat-room/get-messages/${roomId}`);
