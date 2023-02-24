import React from 'react';

const UserOnline = () => {
  return (
    <div className="bg-gray-200 w-1/6 p-4">
      <h1 className="text-xl mb-4">User List</h1>
      <ul>
        <li className="mb-4">
          <a href="/" className="block">
            User 1
          </a>
        </li>
        <li className="mb-4">
          <a href="/user2" className="block">
            User 2
          </a>
        </li>
        <li className="mb-4">
          <a href="/user3" className="block">
            User 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserOnline;
