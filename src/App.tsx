import 'devextreme/dist/css/dx.light.css';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import 'antd/dist/reset.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router';

import { getUsers } from './api/Users/user.api';
import Header from './components/Header/Header';
import LeftMenu from './components/LeftMenu';
import { hasmapUser } from './helper';
import Login from './pages/Auth/Login';
import LayoutChat from './pages/Chat/Layout';
import ReportLayout from './pages/Task';
import Users from './pages/Users';
import WorkListLayout from './pages/WorkList';
import useSocket from './Socket/useSocket';
import { setListUsers, setUsers } from './stores/resource-store';

function App() {
  const dispatch = useDispatch();

  const elements = useRoutes([
    {
      path: '/users',
      element: <Users />,
    },
    {
      path: '/message',
      element: <LayoutChat />,
    },
    {
      path: '/work-list',
      element: <WorkListLayout />,
    },
    {
      path: '/task',
      element: <ReportLayout />,
    },
  ]);

  useSocket();

  useEffect(() => {
    const fetch = async () => {
      const users = await getUsers();
      const usersHasmap = hasmapUser(users?.data);
      dispatch(setListUsers(usersHasmap));
      dispatch(setUsers(users?.data));
    };
    fetch();
  }, []);
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Login />;
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <div className="flex flex-row h-screen w-screen pt-16">
        <LeftMenu />
        <div className="flex flex-row w-screen p-2">{elements}</div>
      </div>
    </div>
  );
}

export default App;
