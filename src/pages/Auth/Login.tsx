import './login.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

import useLogin from './modules/useLogin';

const Login = () => {
  const { submit } = useLogin();

  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = (data: { username: string; password: string }) =>
    submit(data?.username, data?.password);

  return (
    <div className="container-login">
      <div className="content">
        <div className="item-child">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {/* <button className="submit" onClick={submit}>
              <span>Login</span>
            </button> */}
            <input
              type="submit"
              value="Đăng nhập"
              className="bg-blue-500 w-full mt-5 p-3 rounded-lg text-gray-50 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
