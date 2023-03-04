/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useMemo, useState } from 'react';

import { getListChatUser } from '../../../../api/Chat/chat';
import { useChat } from '../../../../context/app.context';
import useUserOnline from '../../modules/useUserOnline';

const ListMessageUsers = () => {
  const { listUsers, currentUser, selectedUser, isRenderListMessage } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [listChats, setListChats] = useState([]);
  const [flag, setFlag] = useState(true);

  const list = useMemo(() => {
    return listChats.map((item: any) => {
      return item.users.find((user: any) => user !== currentUser._id);
    });
  }, [listChats]);

  console.log(3333, list);

  const handleOnclick = (userId: any) => {
    handleGetCurrentChat(userId);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getListChatUser(currentUser?._id);
      setListChats(data.data.listChats);
    };
    fetch();
  }, [isRenderListMessage]);

  useEffect(() => {
    if (list.length > 0 && flag) {
      // selected tin nhắn đầu tiên
      handleGetCurrentChat(list[0]);
      setFlag(false);
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
