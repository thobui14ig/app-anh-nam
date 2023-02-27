import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

import { getMessages, MessageType, sendMessage } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
import { getUserLocal } from '../../../helper';
import { RootState } from '../../../stores/store';

type Inputs = {
  newMessage: string;
};

const ChatComponent = () => {
  const { roomId, receiveId } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const user = getUserLocal();
  const { socket: currentSocket } = useSelector((state: RootState) => state.socket);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    if (roomId) {
      const fetch = async () => {
        const { data } = await getMessages(roomId as string);
        setMessages(data?.messages);
      };

      fetch();
    }
  }, [roomId]);

  useEffect(() => {
    if (currentSocket) {
      currentSocket?.on(
        'sendDataServer',
        (data: { receiveId: string; content: string }) => {
          const { content, receiveId } = data;
          console.log(22, data);
          handleAppendMessage(receiveId, content);
        },
      );
    }
  }, [currentSocket]);

  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { newMessage } = data;
    if (newMessage.length > 0) {
      reset();
      const values = {
        content: newMessage,
        roomId,
        receiveId,
      };
      //insert message
      await sendMessage(values);
      //gui len socket
      currentSocket.emit('sendMessage', {
        senderId: user._id,
        text: newMessage,
        receiveId,
      });
      //append vao mang tin nhan
      handleAppendMessage(user._id, newMessage);
    }
  };

  const handleAppendMessage = (userId: string, content: string) => {
    const messageAppend = {
      _id: String(new Date().getTime()),
      content: content,
      createdBy: {
        _id: userId,
      },
    };
    setMessages((prev: any) => {
      return [...prev, messageAppend];
    });
  };

  return (
    <div className="bg-gray-100 flex-grow flex flex-col">
      <h1 className="text-xl mb-4">Chat Component</h1>
      <ScrollToBottom className="border border-gray-300 flex-grow mb-4 p-2 overflow-y-scroll">
        {messages.map((message: MessageType) => (
          <div
            key={message._id}
            className={`flex ${
              message.createdBy._id === user._id ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div className="flex items-end">
              {!(message.createdBy._id === user._id) && (
                <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                  <img src={'https://via.placeholder.com/50x50'} alt="Avatar" />
                </div>
              )}
              <div
                className={`${
                  message.createdBy._id === user._id ? 'bg-blue-500' : 'bg-gray-300'
                } rounded-lg py-2 px-4 text-gray-900 max-w-xs break-words`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </ScrollToBottom>
      <div className="flex">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex items-stretch">
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

        {/* <button
          className="bg-blue-500 text-white py-3 px-6 rounded ml-2"
          onClick={(e) => handleMessageSubmit(e)}
        >
          Send
        </button> */}
      </div>
    </div>
  );
};

export default ChatComponent;
