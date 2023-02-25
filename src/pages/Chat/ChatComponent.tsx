import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

import { getMessages, MessageType, sendMessage } from '../../api/Chat/chat';
import { useChat } from '../../context/app.context';
import { getUserLocal } from '../../helper';
import { RootState } from '../../stores/store';

const ChatComponent = () => {
  const { roomId, receiveId } = useChat();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const user = getUserLocal();
  const { socket: currentSocket } = useSelector((state: RootState) => state.socket);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isRender, setIsrender] = useState({
    render: false,
  });

  useEffect(() => {
    if (roomId) {
      const fetch = async () => {
        const { data } = await getMessages(roomId as string);

        setMessages(data?.messages);
      };

      fetch();
    }
  }, [roomId, isRender]);

  useEffect(() => {
    if (currentSocket) {
      currentSocket?.on('sendDataServer', (data: any) => {
        const { render } = data;
        if (render) {
          setIsrender({ render: !isRender.render });
        }
        // setMessages((oldMsgs) => [...oldMsgs, dataGot.data]);
      });
    }
  }, [currentSocket]);

  const handleMessageSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newMessage.length > 0) {
      const values = {
        content: newMessage,
        roomId,
        receiveId,
      };
      await sendMessage(values);
      currentSocket.emit('sendMessage', {
        senderId: user._id,
        text: newMessage,
        receiveId,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-100 flex-grow flex flex-col">
      <h1 className="text-xl mb-4">Chat Component</h1>
      <ScrollToBottom
        className="border border-gray-300 flex-grow mb-4 p-2 overflow-y-scroll"
        ref={messagesRef}
      >
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
