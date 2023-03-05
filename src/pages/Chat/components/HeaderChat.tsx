/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import { getUsersInRoom } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
import GroupMembers from './Chat-room/GroupMembers';
import ModalSettingGroup from './Modal/ModalSettingGroup';

export default function HeaderChat({ roomId, title }: { roomId: string; title: string }) {
  const { isModalSettingGroup, setModalSettingGroup, setGroupName, setListUserGroup } =
    useChat();
  const [users, setUsers] = useState([]);

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
        <div
          className="text-3xl cursor-pointer"
          onClick={() => setModalSettingGroup(true)}
        >
          <SettingOutlined />
        </div>
      </div>
      <ModalSettingGroup />
    </>
  );
}