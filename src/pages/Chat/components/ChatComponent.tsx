/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

import {
  getMessages,
  MessageType,
  removeMessage,
  sendMessage,
} from '../../../api/Chat/chat';
import { getUser } from '../../../api/Users/user.api';
import { useChat } from '../../../context/app.context';
import { getUserLocal, randomColor } from '../../../helper';
import { RootState } from '../../../stores/store';
import { Roles } from '../../../type/role.enum';
import DropdownRemove from './Dropdown/DropdownRemove';
import DropdownRemoveEdit from './Dropdown/DropdownRemoveEdit';
import HeaderChat from './HeaderChat';

type Inputs = {
  newMessage: string;
};

const ChatComponent = () => {
  const { roomId, receiveIds, title, setReloadListMessage } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const user = getUserLocal();
  const { socket: currentSocket } = useSelector((state: RootState) => state.socket);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [typeRoom, setTypeRoom] = useState('user');

  useEffect(() => {
    if (roomId) {
      const fetch = async () => {
        const { data } = await getMessages(roomId as string);
        setTypeRoom(data.type);
        setMessages(data?.messages);
      };

      fetch();
    }
  }, [roomId]);

  useEffect(() => {
    if (currentSocket) {
      currentSocket?.on(
        'sendDataServer',
        (data: {
          senderId: string;
          content: string;
          roomId: string;
          messageId: string;
        }) => {
          const { content, senderId, roomId: roomIdRerturn, messageId } = data;
          const rId = localStorage.getItem('roomId');
          setReloadListMessage(new Date().getTime());

          if (roomIdRerturn === rId) {
            handleAppendMessage(senderId, content, messageId);
          }
        },
      );
    }
  }, [currentSocket]);

  useEffect(() => {
    if (currentSocket) {
      currentSocket?.on(
        'sendDataServerRemoveMessage',
        (data: { roomId: string; messageId: string }) => {
          const { messageId, roomId } = data;
          const rId = localStorage.getItem('roomId');

          if (roomId === rId) {
            setMessages((prev: any) => {
              const newMessages = prev.filter((item: any) => item._id !== messageId);
              return newMessages;
            });
          }
        },
      );
    }
  }, [currentSocket]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { newMessage } = data;
    if (newMessage.length > 0) {
      reset();
      const values = {
        content: newMessage,
        roomId,
        receiveIds,
      };
      //insert message
      const { data: messageReturn } = await sendMessage(values);
      //append vao mang tin nhan
      handleAppendMessage(user._id, newMessage, messageReturn._id);
      //gui len socket
      currentSocket.emit('sendMessage', {
        senderId: user._id,
        text: newMessage,
        receiveIds,
        roomId,
        messageId: messageReturn._id,
      });
    }
  };

  const handleAppendMessage = async (userId: string, content: string, _id: string) => {
    const user = await getUser(userId);
    const messageAppend = {
      _id,
      content: content,
      createdAt: new Date(),
      createdBy: {
        _id: userId,
        name: user.data.name,
      },
    };
    setMessages((prev: any) => {
      return [...prev, messageAppend];
    });
  };

  const handleRemoveMessage = async (id: string) => {
    setMessages((prev: any) => {
      const lists = prev.filter((message: any) => message._id !== id);
      return [...lists];
    });
    await removeMessage(id, roomId as string);
    currentSocket.emit('removeMessage', {
      receiveIds,
      roomId,
      messageId: id,
    });
  };

  return (
    <>
      <div className="bg-gray-100 flex-grow flex flex-col p-3">
        <HeaderChat roomId={roomId as string} title={title} typeRoom={typeRoom} />

        <ScrollToBottom className="border border-gray-300 flex-grow mb-4 p-2 overflow-y-scroll">
          {messages.map((message: MessageType) => (
            <div
              key={message._id}
              className={`flex ${
                message.createdBy._id === user._id ? 'justify-end' : 'justify-start'
              } mb-2  items-center`}
            >
              {Number(user.role) === Roles.ADMIN && message.createdBy._id === user._id && (
                <>
                  <DropdownRemoveEdit
                    messageId={message._id}
                    handleRemoveMessage={handleRemoveMessage}
                  />
                </>
              )}

              <div className="flex items-end">
                {!(message.createdBy._id === user._id) && (
                  <div className="w-8 h-8 rounded-full mr-2 overflow-hidden flex-shrink-0 mb-5">
                    <Avatar style={{ backgroundColor: randomColor(), fontSize: '18px' }}>
                      {message.createdBy.name.charAt(0)}
                    </Avatar>
                  </div>
                )}
                <div>
                  {!(message.createdBy._id === user._id) && (
                    <span className="text-xs text-gray-500 mt-1">
                      {message.createdBy.name}
                    </span>
                  )}

                  <div
                    className={`${
                      message.createdBy._id === user._id ? 'bg-blue-500' : 'bg-gray-300'
                    } rounded-lg py-2 px-4 text-gray-900 max-w-xs break-words`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {dayjs(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                  </div>
                </div>

                {Number(user.role) === Roles.ADMIN &&
                  message.createdBy._id !== user._id && (
                    <DropdownRemove
                      handleRemoveMessage={handleRemoveMessage}
                      messageId={message._id}
                    />
                  )}
              </div>
            </div>
          ))}
        </ScrollToBottom>
        <div className="flex">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-grow flex items-stretch"
          >
            <input
              type="text"
              placeholder="Type your message"
              className="w-full border border-gray-300 py-3 px-4"
              // value={newMessage}
              {...register('newMessage')}
            />
            <input
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded ml-2"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
