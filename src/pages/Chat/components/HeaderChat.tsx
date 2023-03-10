/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useEffect, useState } from 'react';

import { getUsersInRoom, removeRoom } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
import { Roles } from '../../../type/role.enum';
import useUserOnline from '../modules/useUserOnline';
import GroupMembers from './Chat-room/GroupMembers';
import ModalFilesRoom from './Modal/ModalFilesRoom';
import ModalSettingGroup from './Modal/ModalSettingGroup';

export default function HeaderChat({
  roomId,
  title,
  typeRoom,
}: {
  roomId: string;
  title: string;
  typeRoom: string;
}) {
  const {
    setModalSettingGroup,
    setGroupName,
    setListUserGroup,
    setReloadListMessage,
    listChatsApp,
    currentUser,
    isModalFiles,
    setModalFiles,
  } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [users, setUsers] = useState([]);

  const handleRemoveRoom = async () => {
    await removeRoom(roomId);
    await setReloadListMessage(new Date().getTime());
    handleGetCurrentChat(listChatsApp[0]._id);
  };
  const items: MenuProps['items'] = [
    {
      label: <span onClick={() => handleRemoveRoom()}>Xoá trò chuyện</span>,
      key: '0',
    },
    {
      label: <span onClick={() => setModalSettingGroup(true)}>Thông tin</span>,
      key: '1',
      disabled: typeRoom === 'user' ? true : false,
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      if (roomId) {
        const { data } = await getUsersInRoom(roomId);
        setUsers(data?.users);
        setGroupName(data?.name);
        const usersGroup = data?.users.map((item: any) => item._id);
        setListUserGroup(usersGroup);
      }
    };

    fetch();
  }, [roomId]);

  return (
    <>
      <div className="flex mb-4 text-xl justify-between items-center">
        <div className="flex">
          <GroupMembers roomId={roomId as string} users={users} />
          <span className="pt-1 pl-3">{title}</span>
        </div>
        <div className="flex items-center">
          <div
            className="pr-7 text-blue-700 cursor-pointer"
            onClick={() => setModalFiles(true)}
          >
            Files
          </div>
          <div>
            {typeRoom === 'group' && currentUser.role === Roles.ADMIN ? (
              <Dropdown menu={{ items }} trigger={['click']}>
                <SettingOutlined className="text-3xl" />
              </Dropdown>
            ) : currentUser.role === Roles.ADMIN ? (
              <DeleteOutlined className="text-3xl" onClick={handleRemoveRoom} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <ModalSettingGroup />
      {roomId && (
        <ModalFilesRoom
          isModalFiles={isModalFiles}
          setModalFiles={setModalFiles}
          roomId={roomId}
        />
      )}
    </>
  );
}
// {typeRoom === 'group' ? (
//   <Dropdown menu={{ items }} trigger={['click']}>
//     <SettingOutlined className="text-3xl" />
//   </Dropdown>
// ) : (
//   <Dropdown menu={{ items2 }} trigger={['click']}>
//     <SettingOutlined className="text-3xl" />
//   </Dropdown>
// )}
