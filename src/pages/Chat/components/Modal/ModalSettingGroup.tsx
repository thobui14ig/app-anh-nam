import { Modal } from 'antd';
import React from 'react';

import { useChat } from '../../../../context/app.context';
import CreateMessageRoom from '../Chat-room/CreateMessageRoom';

const ModalSettingGroup = () => {
  const { isModalSettingGroup, setModalSettingGroup } = useChat();

  return (
    <>
      <Modal
        title="Thông tin nhóm"
        open={isModalSettingGroup}
        onOk={() => setModalSettingGroup(false)}
        onCancel={() => setModalSettingGroup(false)}
      >
        <CreateMessageRoom />
      </Modal>
    </>
  );
};

export default ModalSettingGroup;
