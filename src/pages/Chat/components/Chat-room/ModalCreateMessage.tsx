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
  } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [userId, setUserId] = useState<string | null>(null);
  const title = 'Tạo tin nhắn mới';

  const handleCreateChat = async () => {
    await handleGetCurrentChat(userId as string);
    setIsRenderListMessage(!isRenderListMessage);
    handleOk();
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

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleCreateChat}
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  );
};

export default ModalCreateMessageUser;
