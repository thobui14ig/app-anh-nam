/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUser, updateUser } from '../../api/Users/user.api';
import { getUserLocal } from '../../helper';

export default function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
  });
  const currentUser = getUserLocal();
  const { handleSubmit } = useForm();

  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUser(currentUser?._id);
      setUser({ ...user, name: data?.name, email: data?.email });
    };

    fetch();
  }, []);

  const handleChangeInfo: SubmitHandler<any> = async (data: any) => {
    if (user?.name.trim().length <= 0 || user?.email.trim().length <= 0) {
      return toast('Bạn cần nhập thông tin đầy đủ');
    }

    await updateUser(currentUser?._id, {
      name: user?.name,
      email: user?.email,
    });
    return toast('Cập nhật thông tin thành công!');
  };

  const handlePassword: SubmitHandler<any> = async (data: any) => {
    if (user?.password.trim().length <= 0) {
      return toast('Mật khẩu không được bỏ trống!');
    }

    await updateUser(currentUser?._id, {
      password: user?.password,
    });
    setIsReset(false);
    return toast('Cập nhật mật khẩu thành công!');
  };
  return (
    <div className="flex w-full justify-center items-center">
      {!isReset ? (
        <form onSubmit={handleSubmit(handleChangeInfo)}>
          <div className="">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Tên đăng nhập
            </label>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />

            <input
              type="submit"
              value="Cập nhật"
              className="bg-blue-500 w-full mt-5 p-3 rounded-lg text-gray-50 cursor-pointer"
            />
            <p className="text-blue-500 cursor-pointer" onClick={() => setIsReset(true)}>
              Đổi mật khẩu
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handlePassword)}>
          <div className="">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Mật khẩu mới
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="submit"
              value="Cập nhật"
              className="bg-blue-500 w-full mt-5 p-3 rounded-lg text-gray-50 cursor-pointer"
            />
            <p className="text-blue-500 cursor-pointer" onClick={() => setIsReset(false)}>
              Đổi thông tin
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
