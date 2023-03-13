/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './login.scss';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { resetPassword } from '../../api/Auth/auth.api';
import useLogin from './modules/useLogin';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login = () => {
  const [isReset, setIsReset] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { submit } = useLogin();
  const { register, handleSubmit } = useForm();

  const onLogin: SubmitHandler<any> = (data: { username: string; password: string }) =>
    submit(data?.username, data?.password);

  const onReset: SubmitHandler<any> = (data: { email: string }) => {
    setIsValidEmail(true);
    if (!emailRegex.test(data?.email)) {
      setIsValidEmail(false);
      return;
    }
    resetPassword(data?.email);

    toast('Mật khẩu đã được gửi về email của bạn!');
    setTimeout(() => {
      setIsReset(false);
    }, 2000);
  };

  // console.log(1111, isValidEmail);

  return (
    <div className="container-login">
      <div className="content">
        <div className="item-child">
          {!isReset ? (
            <>
              <form onSubmit={handleSubmit(onLogin)}>
                <input
                  className="username"
                  {...register('username')}
                  placeholder="user name"
                  type="text"
                />
                <input
                  className="password"
                  {...register('password')}
                  placeholder="Password"
                  type="password"
                />
                <input
                  type="submit"
                  value="Đăng nhập"
                  className="bg-blue-500 w-full mt-5 p-3 rounded-lg text-gray-50 cursor-pointer"
                />

                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsReset(true)}
                >
                  Quên mật khẩu
                </p>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onReset)}>
                <span>Nhập email:</span>
                <input
                  className="username mt-5"
                  {...register('email')}
                  placeholder="Email"
                  type="text"
                />
                {!isValidEmail && (
                  <p className="text-red-600">Mật khẩu không đúng định dạng!</p>
                )}

                <input
                  type="submit"
                  value="Reset"
                  className="bg-blue-500 w-full mt-5 p-3 rounded-lg text-gray-50 cursor-pointer"
                />

                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsReset(false)}
                >
                  Đăng nhập
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
