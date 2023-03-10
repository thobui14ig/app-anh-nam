import '../login.scss';

import { useState } from 'react';
import { toast } from 'react-toastify';

import ApiConstant from '../../../api/apiConstant';
import { login } from '../../../api/Auth/auth.api';

const useLogin = () => {
  // const [username, setUsername] = useState('admin');
  // const [password, setPassword] = useState('111111');

  // const handleGetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(e.target.value);
  // };

  // const handleGetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

  const submit = async (username: string, password: string) => {
    try {
      if (username.trim().length <= 0 || password.trim().length <= 0) {
        toast.error('Tên đăng nhập hoặc mật khẩu không được bỏ trống!');
        return;
      }
      const { data } = await login({ name: username.trim(), password: password.trim() });
      if (!data) {
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác!');
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
      toast.error(err?.response?.data);
    }
  };

  return { submit };
};

export default useLogin;
