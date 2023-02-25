import React, { useEffect, useRef, useState } from 'react';

import { getMessages, MessageType, sendMessage } from '../../api/Chat/chat';
import { useChat } from '../../context/app.context';
import { getUserLocal } from '../../helper';
// import { ScrollToBottom } from 'react-scroll-to-bottom';

const ChatComponent = () => {
  const { roomId, receiveId } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const user = getUserLocal();
  console.log(111, roomId);

  useEffect(() => {
    if (roomId) {
      const fetch = async () => {
        const { data } = await getMessages(roomId as string);
        setMessages(data?.messages);
      };

      fetch();
    }
  }, [roomId]);

  const messagesRef = useRef<HTMLDivElement>(null);

  const handleMessageSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newMessage.length > 0) {
      setNewMessage('');
      const values = {
        content: newMessage,
        roomId,
        receiveId,
      };
      await sendMessage(values);
      //set lai messages
      setMessages((pre: MessageType[]) => {
        const message: MessageType = {
          _id: String(new Date().getTime()),
          content: newMessage,
          createdBy: {
            _id: user._id,
            email: 'string',
            name: 'string',
            createdAt: 'Date',
            updatedAt: 'Date',
          },
        };
        return [...pre, message];
      });
    }
  };

  return (
    <div className="bg-gray-100 flex-grow flex flex-col">
      <h1 className="text-xl mb-4">Chat Component</h1>
      <div className="border border-gray-300 flex-grow mb-4 p-2 overflow-y-scroll">
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
                } rounded-lg py-2 px-4 text-white max-w-xs break-words`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesRef} />
      </div>
      <div className="flex">
        <div className="flex-grow flex items-stretch">
          <input
            type="text"
            placeholder="Type your message"
            className="w-full border border-gray-300 py-3 px-4"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-3 px-6 rounded ml-2"
          onClick={(e) => handleMessageSubmit(e)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
