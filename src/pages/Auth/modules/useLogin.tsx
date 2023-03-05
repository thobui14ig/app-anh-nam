import '../login.scss';

import { useState } from 'react';
import { toast } from 'react-toastify';

import ApiConstant from '../../../api/apiConstant';
import { login } from '../../../api/Auth/auth.api';

const useLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('111111');

  const handleGetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleGetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submit = async () => {
    try {
      const { data } = await login({ name: username, password: password });
      if (!data) {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
        return;
      }
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userInfo', JSON.stringify(data?.user));
      if (Number(data.user.role) === 1) {
        window.location.href = ApiConstant.REDIRECT_ADMIN;
      } else {
        window.location.href = ApiConstant.REDIRECT_USER;
      }
    } catch (err: any) {
      toast(err?.response?.data);
    }
  };

  return { username, password, handleGetUsername, handleGetPassword, submit };
};

export default useLogin;
