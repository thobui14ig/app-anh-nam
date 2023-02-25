/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import useUserOnline from './modules/useUserOnline';
const users = [
  { _id: '63a6cae6d4b4cc4dde8f9098', name: 'Tho' },
  { _id: '63e51c066c87521b8473125e', name: 'Tanh' },
  { _id: '63f9b45d315c6cba5621af61', name: 'Tuan' },
];

const UserOnline = () => {
  const { handleGetCurrentChat } = useUserOnline();
  return (
    <div className="bg-gray-200 w-1/3 p-4">
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className="text-gray-700 font-medium pb-2">Danh sách tin nhắn</div>
        <button className="text-gray-700 font-medium pb-2">+</button>
      </div>
      <ul className="mt-6">
        {users.map((user: any) => {
          return (
            <li
              key={user._id}
              className="text-gray-600 mb-2 hover:bg-sky-200 p-2 rounded-md cursor-pointer"
              onClick={() => handleGetCurrentChat(user._id)}
            >
              <span>{user.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserOnline;
