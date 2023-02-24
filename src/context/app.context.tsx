/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
interface ChatState {
  messages: any;
  setMessages: any;
  roomId: string | null;
  setRoomId: any;
  receiveId: string | null;
  setReceive: any;
}

export const ChatContext = React.createContext<ChatState>({
  messages: undefined,
  setMessages: undefined,
  roomId: '',
  setRoomId: undefined,
  receiveId: null,
  setReceive: undefined,
});

const ChatProvider = ({ children }: any) => {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [receiveId, setReceive] = useState('');

  const values = {
    messages,
    setMessages,
    roomId,
    setRoomId,
    receiveId,
    setReceive,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export default ChatProvider;

export const useChat = (): ChatState => {
  return useContext(ChatContext);
};
