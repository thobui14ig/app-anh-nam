/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useMemo, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import { getUserLocal } from '../helper';
import { Roles } from '../type/role.enum';

const LeftMenu = () => {
  const menuAdmin = [
    { id: 1, route: 'task', name: 'Giao việc' },
    { id: 2, route: 'message', name: 'Message' },
    { id: 3, route: 'users', name: 'Quản lý nhân viên' },
  ];
  const menuSupAdmin = [
    { id: 1, route: 'work-list', name: 'Task' },
    { id: 2, route: 'message', name: 'Message' },
    { id: 3, route: 'users', name: 'Quản lý nhân viên' },
  ];
  const menuUser = [
    { id: 1, route: 'work-list', name: 'Task' },
    { id: 2, route: 'message', name: 'Message' },
  ];
  const user = getUserLocal();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);

  const redirect = (route: string) => {
    navigate(`/${route}`);
  };

  const menus = useMemo(() => {
    return Number(user.role) === Roles.ADMIN
      ? menuAdmin
      : Number(user.role) === Roles.SUPORT_ADMIN
      ? menuSupAdmin
      : menuUser;
  }, []);

  return (
    <div className="bg-gray-900 text-white w-1/6 p-4 max-w-xs ">
      <ul>
        {menus.map((item) => {
          return (
            <li
              key={item.id}
              className={`mb-4 text-base rounded-md p-2 cursor-pointer ${
                selected === item.id ? 'bg-sky-400 ' : ''
              }`}
              onClick={() => {
                setSelected(item.id);
                redirect(item.route);
              }}
            >
              <span className="text-white">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftMenu;
