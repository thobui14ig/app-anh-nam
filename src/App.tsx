import './App.css';
import 'antd/dist/reset.css';

import { useRoutes } from 'react-router';

import LeftMenu from './components/LeftMenu';
import Login from './pages/Auth copy/Login';
import LayoutChat from './pages/Chat/Layout';
import TaskLayout from './pages/Task/TaskLayout';

function App() {
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
    // },
  ]);

  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Login />;
  }

  return (
    <div className="flex flex-row h-screen w-screen">
      <LeftMenu />
      <div className="flex flex-row h-screen w-screen p-2">{elements}</div>
    </div>
  );
}

export default App;
