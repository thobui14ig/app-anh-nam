/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { getUserLocal } from '../helper';
import { RootState } from '../stores/store';
interface ChatState {
  messages: any;
  setMessages: any;
  roomId: string | null;
  setRoomId: any;
  receiveIds: string | null;
  setReceive: any;
  isModalOpen: any;
  setIsModalOpen: any;
  showModal: any;
  handleOk: any;
  handleCancel: any;
  screen: any;
  setScreen: any;
  listUsers: any;
  currentUser: any;
  selectedUser: any;
  setSelectedUser: any;
  setIsRenderListMessage: any;
  isRenderListMessage: any;
  listUsersGroup: any;
  setListUserGroup: any;
  groupName: any;
  setGroupName: any;
  title: any;
  setTitle: any;
  isModalSettingGroup: any;
  setModalSettingGroup: any;
  reloadListMessage: any;
  setReloadListMessage: any;
  listUsersGroupDelete: any;
  setListUserGroupDelete: any;
  listChatsApp: any;
  setListChatsApp: any;
  isModalFiles: any;
  setModalFiles: any;
}

export const ChatContext = React.createContext<ChatState>({
  messages: undefined,
  setMessages: undefined,
  roomId: '',
  setRoomId: undefined,
  receiveIds: null,
  setReceive: undefined,
  isModalOpen: undefined,
  setIsModalOpen: undefined,
  showModal: undefined,
  handleOk: undefined,
  handleCancel: undefined,
  screen: undefined,
  setScreen: undefined,
  listUsers: undefined,
  currentUser: undefined,
  selectedUser: undefined,
  setSelectedUser: undefined,
  setIsRenderListMessage: undefined,
  isRenderListMessage: undefined,
  listUsersGroup: undefined,
  setListUserGroup: undefined,
  groupName: undefined,
  setGroupName: undefined,
  title: undefined,
  setTitle: undefined,
  isModalSettingGroup: undefined,
  setModalSettingGroup: undefined,
  reloadListMessage: undefined,
  setReloadListMessage: undefined,
  listUsersGroupDelete: undefined,
  setListUserGroupDelete: undefined,
  listChatsApp: undefined,
  setListChatsApp: undefined,
  isModalFiles: undefined,
  setModalFiles: undefined,
});

export enum SCREEN_TYPE {
  USER = 1,
  GROUP = 2,
}

const ChatProvider = ({ children }: any) => {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [receiveIds, setReceive] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screen, setScreen] = useState(SCREEN_TYPE.USER);
  const { listUsers } = useSelector((state: RootState) => state.resource);
  const currentUser = getUserLocal();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRenderListMessage, setIsRenderListMessage] = useState(false);
  const [listUsersGroup, setListUserGroup] = useState<string[]>([]);
  const [listUsersGroupDelete, setListUserGroupDelete] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isModalSettingGroup, setModalSettingGroup] = useState(false);
  const [reloadListMessage, setReloadListMessage] = useState(new Date().getTime());
  const [listChatsApp, setListChatsApp] = useState([]);
  const [isModalFiles, setModalFiles] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const values = {
    messages,
    setMessages,
    roomId,
    setRoomId,
    receiveIds,
    setReceive,
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleOk,
    handleCancel,
    screen,
    setScreen,
    listUsers,
    currentUser,
    selectedUser,
    setSelectedUser,
    isRenderListMessage,
    setIsRenderListMessage,
    listUsersGroup,
    setListUserGroup,
    groupName,
    setGroupName,
    title,
    setTitle,
    isModalSettingGroup,
    setModalSettingGroup,
    reloadListMessage,
    setReloadListMessage,
    listUsersGroupDelete,
    setListUserGroupDelete,
    listChatsApp,
    setListChatsApp,
    isModalFiles,
    setModalFiles,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export default ChatProvider;

export const useChat = (): ChatState => {
  return useContext(ChatContext);
};
