/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { NotificationOutlined } from '@ant-design/icons';
import list from '@fullcalendar/list';
import { Avatar } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { getListChatUser, setIsReadTrue } from '../../../../api/Chat/chat';
import { useChat } from '../../../../context/app.context';
import useUserOnline from '../../modules/useUserOnline';
import avatarGroup from './../img/group.png';
import avatarUser from './../img/user.png';

const ListMessageUsers = () => {
  const {
    listUsers,
    currentUser,
    selectedUser,
    isRenderListMessage,
    reloadListMessage,
    roomId,
    setListChatsApp,
  } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [listChats, setListChats] = useState([]);
  const [flag, setFlag] = useState(true);

  const list = useMemo(() => {
    const data = listChats.map((item: any) => {
      let isRead;
      if (roomId === item._id) {
        //nếu user đang ở chính phòng đó thì cũng set isRead bằng true
        // setIsReadTrue(roomId as string);
        setIsReadTrue(item._id);
        isRead = true;
      } else if (!item?.chatUser?.isRead) {
        isRead = false;
      } else {
        isRead = item?.chatUser?.isRead;
      }

      if (item?.type === 'user') {
        const data = item.users.find((user: any) => user !== currentUser._id);

        return {
          id: item._id,
          name: data,
          type: item.type,
          isRead,
        };
      }
      return {
        id: item._id,
        name: item.name,
        type: item.type,
        isRead,
      };
    });

    return data;
  }, [listChats, roomId]);

  const handleOnclick = async (userId: any) => {
    const SETISREAD = setIsReadTrue(userId);
    const GETCHAT = handleGetCurrentChat(userId);
    return Promise.all([SETISREAD, GETCHAT]);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getListChatUser(currentUser?._id);

      setListChatsApp(data.data.listChats);
      setListChats(data.data.listChats);
    };
    fetch();
  }, [isRenderListMessage, reloadListMessage, roomId]);

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
                  ? 'text-gray-600 mb-2 p-3 pl-1 rounded-md cursor-pointer bg-sky-400 relative'
                  : 'text-gray-600 mb-2 hover:bg-sky-200 p-3 pl-1 rounded-md cursor-pointer relative'
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
                <span className="pl-2 font-bold" style={{ fontSize: '0.9375rem' }}>
                  {item.name}
                </span>
              ) : (
                <span className="pl-2 font-bold" style={{ fontSize: '0.9375rem' }}>
                  {listUsers[item.name]}
                </span>
              )}
              {!item.isRead && (
                <div
                  className="absolute top-7 right-1"
                  style={{
                    background: 'hsl(214deg 89% 52%)',
                    width: 12,
                    height: 12,
                    borderRadius: 12,
                  }}
                ></div>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default ListMessageUsers;
