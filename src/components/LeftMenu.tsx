import React from 'react';
import { Link } from 'react-router-dom';

const LeftMenu = () => {
  return (
    <div className="bg-gray-900 text-white w-1/6 p-4">
      <ul>
        <li className="mb-4">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="mb-4">
          <Link to="task">Task</Link>
        </li>
        <li className="mb-4">
          <Link to="message">Message</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
