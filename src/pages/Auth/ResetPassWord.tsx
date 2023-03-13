import './login.scss';

import { SubmitHandler, useForm } from 'react-hook-form';

import useLogin from './modules/useLogin';

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = (data: { username: string; password: string }) =>
    console.log(data);

  return (
    <div className="container-login">
      <div className="content">
        <div className="item-child">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="email"
              {...register('email')}
              placeholder="Email"
              type="text"
            />
            {/* <button className="submit" onClick={submit}>
              <span>Login</span>
            </button> */}
            <input
              type="submit"
              value="Đăng nhập"
              className="bg-blue-500 w-full mt-5 p-3 rounded-lg text-gray-50 cursor-pointer"
            />
            <p className="text-blue-500">Login</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
