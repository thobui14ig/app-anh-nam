/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Avatar } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { getListChatUser } from '../../../../api/Chat/chat';
import { useChat } from '../../../../context/app.context';
import useUserOnline from '../../modules/useUserOnline';
import avatarGroup from './../img/group.png';
import avatarUser from './../img/user.png';

const ListMessageUsers = () => {
  const { listUsers, currentUser, selectedUser, isRenderListMessage, reloadListMessage } =
    useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [listChats, setListChats] = useState([]);
  const [flag, setFlag] = useState(true);

  const list = useMemo(() => {
    return listChats.map((item: any) => {
      if (item?.type === 'user') {
        const data = item.users.find((user: any) => user !== currentUser._id);
        return {
          id: item._id,
          name: data,
          type: item.type,
        };
      }
      return {
        id: item._id,
        name: item.name,
        type: item.type,
      };
    });
  }, [listChats]);

  const handleOnclick = (userId: any) => {
    handleGetCurrentChat(userId);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getListChatUser(currentUser?._id);
      setListChats(data.data.listChats);
    };
    fetch();
  }, [isRenderListMessage, reloadListMessage]);

  useEffect(() => {
    if (list.length > 0 && flag) {
      // selected tin nhắn đầu tiên
      handleGetCurrentChat(list[0].id);
      setFlag(false);
    }
  }, [listChats]);

  return (
    <ul className="mt-6">
      {list &&
        listUsers &&
        list.map((item, index) => {
          return (
            <li
              key={index}
              className={
                selectedUser === item.id
                  ? 'text-gray-600 mb-2 p-3 pl-1 rounded-md cursor-pointer bg-sky-400'
                  : 'text-gray-600 mb-2 hover:bg-sky-200 p-3 pl-1 rounded-md cursor-pointer'
              }
              onClick={() => handleOnclick(item.id)}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {item.type === 'group' ? (
                <Avatar size={50} src={avatarGroup} style={{ background: '#c4c6cb' }} />
              ) : (
                <Avatar size={50} src={avatarUser} style={{ background: '#c4c6cb' }} />
              )}

              {item.type === 'group' ? (
                <span className="pl-2 text-xl font-bold">{item.name}</span>
              ) : (
                <span className="pl-2 text-xl font-bold">{listUsers[item.name]}</span>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default ListMessageUsers;
