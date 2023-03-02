/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router';

import { getUserLocal } from '../../helper';

export default function Header() {
  const navigate = useNavigate();
  const currentUser = getUserLocal();

  const logout = () => {
    localStorage.clear();
    navigate(`/login`);
  };
  return (
    <div className="flex flex-row items-center justify-between h-16 px-4 bg-gray-800 text-white fixed top-0 left-0 right-0 z-10">
      <div>WEBSITE</div>
      <div className="flex-grow"></div>
      <div className="cursor-pointer mr-4">
        <span>{currentUser?.name}</span>
      </div>
      <div className="cursor-pointer">
        <span onClick={() => logout()}>Đăng xuất</span>
      </div>
    </div>
  );
}
