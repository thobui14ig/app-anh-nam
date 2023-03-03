import { Modal, Select, Tabs, TabsProps } from 'antd';
import { useState } from 'react';

import { useChat } from '../../../../context/app.context';
import useUserOnline from '../../modules/useUserOnline';
import CreateMessageRoom from './CreateMessageRoom';
import CreateMessageUser from './CreateMessageUser';

const ModalCreateMessageUser: React.FC = () => {
  const {
    handleCancel,
    handleOk,
    isModalOpen,
    isRenderListMessage,
    setIsRenderListMessage,
    setScreen,
    screen,
    listUsersGroup,
    groupName,
  } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [userId, setUserId] = useState<string | null>(null);
  const title = 'Tạo tin nhắn mới';

  const handleCreateChat = async () => {
    if (screen === 1) {
      await handleGetCurrentChat(userId as string);
      setIsRenderListMessage(!isRenderListMessage);
      handleOk();
    } else {
      console.log('tạo group', listUsersGroup, groupName);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `User`,
      children: <CreateMessageUser setUserId={setUserId} />,
    },
    {
      key: '2',
      label: `Group`,
      children: <CreateMessageRoom />,
    },
  ];

  const onChange = (key: string) => {
    setScreen(Number(key));
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleCreateChat}
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </>
  );
};

export default ModalCreateMessageUser;