import React, { useEffect, useRef, useState } from 'react';
// import { ScrollToBottom } from 'react-scroll-to-bottom';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', text: 'Hi there!' },
    {
      id: 2,
      sender: 'other',
      text: 'Hello, how are you?',
      avatar: 'https://via.placeholder.com/50x50',
    },
    { id: 3, sender: 'user', text: "I'm doing well, thanks. How about you?" },
    {
      id: 4,
      sender: 'other',
      text: "I'm good, thanks for asking.",
      avatar: 'https://via.placeholder.com/50x50',
    },
  ]);
  const messagesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-gray-100 flex-grow flex flex-col">
      <h1 className="text-xl mb-4">Chat Component</h1>
      <div className="border border-gray-300 flex-grow mb-4 p-2 overflow-y-scroll">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div className="flex items-end">
              {message.sender !== 'user' && (
                <div className="w-8 h-8 rounded-full mr-2 overflow-hidden">
                  <img src={message.avatar} alt="Avatar" />
                </div>
              )}
              <div
                className={`${
                  message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-300'
                } rounded-lg py-2 px-4 text-white max-w-xs break-words`}
              >
                {message.text}
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
          />
        </div>
        <button className="bg-blue-500 text-white py-3 px-6 rounded ml-2">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
