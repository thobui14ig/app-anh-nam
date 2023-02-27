/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useMemo, useState } from 'react';

import { useChat } from '../../../../context/app.context';
import { useListMessageUser } from '../../modules/useListMessageUsers';
import useUserOnline from '../../modules/useUserOnline';

const ListMessageUsers = () => {
  const { listUsers, currentUser, selectedUser } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const { listChats } = useListMessageUser();
  const [selected, setSelected] = useState();
  const list = useMemo(() => {
    return listChats.map((item: any) => {
      return item.users.find((user: any) => user !== currentUser._id);
    });
  }, [listChats]);

  const handleOnclick = (userId: any) => {
    // alert(chat._id);
    handleGetCurrentChat(userId);
  };

  useEffect(() => {
    if (list.length > 0) {
      handleGetCurrentChat(list[0]);
    }
  }, [listChats]);

  return (
    <ul className="mt-6">
      {list &&
        listUsers &&
        list.map((userId, index) => {
          return (
            <li
              key={index}
              className={
                selectedUser === userId
                  ? 'text-gray-600 mb-2 p-2 rounded-md cursor-pointer bg-sky-400'
                  : 'text-gray-600 mb-2 hover:bg-sky-200 p-2 rounded-md cursor-pointer '
              }
              onClick={() => handleOnclick(userId)}
            >
              <span>{listUsers[userId]}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default ListMessageUsers;
