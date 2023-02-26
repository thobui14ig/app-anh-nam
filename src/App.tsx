/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './App.css';
import 'antd/dist/reset.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router';

import ApiConstant from './api/apiConstant';
import { getUsers } from './api/Users/user.api';
import LeftMenu from './components/LeftMenu';
import { getUserLocal, hasmapUser } from './helper';
import Login from './pages/Auth/Login';
import LayoutChat from './pages/Chat/Layout';
import ReportLayout from './pages/Report';
import TaskLayout from './pages/Task/TaskLayout';
import useSocket from './Socket/useSocket';
import { setListUsers } from './stores/resource-store';

function App() {
  const dispatch = useDispatch();
  const currentUser = getUserLocal();
  const elements = useRoutes([
    {
      path: '/',
      element: <h1>Trang chủ</h1>,
    },
    {
      path: '/message',
      element: <LayoutChat />,
    },
    {
      path: '/task',
      element: <TaskLayout />,
    },
    {
      path: '/report',
      element: <ReportLayout />,
    },
    // },
  ]);

  const logout = () => {
    localStorage.clear();
    window.location.href = ApiConstant.BASE_CLIENT_URL + '/login';
  };

  useSocket();

  useEffect(() => {
    const fetch = async () => {
      const users = await getUsers();
      const usersHasmap = hasmapUser(users?.data);
      dispatch(setListUsers(usersHasmap));
    };
    fetch();
  }, []);
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Login />;
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-row items-center justify-between h-16 px-4 bg-gray-800 text-white fixed top-0 left-0 right-0 z-10">
        <div>Nguyễn Nam Anh</div>
        <div className="flex-grow"></div>
        <div className="cursor-pointer mr-4">
          <span>{currentUser?.name}</span>
        </div>
        <div className="cursor-pointer">
          <span onClick={() => logout()}>Đăng xuất</span>
        </div>
      </div>
      <div className="flex flex-row h-screen w-screen pt-16">
        <LeftMenu />
        <div className="flex flex-row w-screen p-2">{elements}</div>
      </div>
    </div>
  );
}

export default App;
