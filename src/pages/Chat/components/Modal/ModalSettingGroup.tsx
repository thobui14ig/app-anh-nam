import { Button, Modal } from 'antd';
import React from 'react';

import { editRoom } from '../../../../api/Chat/chat';
import { useChat } from '../../../../context/app.context';
import CreateMessageRoom from '../Chat-room/CreateMessageRoom';

const ModalSettingGroup = () => {
  const {
    isModalSettingGroup,
    setModalSettingGroup,
    roomId,
    listUsersGroup,
    groupName,
    listUsersGroupDelete,
    setTitle,
    setReloadListMessage,
  } = useChat();

  const handleOk = async () => {
    setModalSettingGroup(false);
    const values = {
      title: groupName,
      listUsersGroupDelete,
      listUsersGroup,
    };
    await editRoom(roomId as string, values);
    setTitle(groupName);
    setReloadListMessage(new Date().getTime());
  };

  return (
    <>
      <Modal
        title="Thông tin nhóm"
        open={isModalSettingGroup}
        onOk={() => handleOk()}
        onCancel={() => setModalSettingGroup(false)}
      >
        <CreateMessageRoom />
      </Modal>
    </>
  );
};

export default ModalSettingGroup;
