import { Modal, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { createGroupChat } from '../../../../api/Chat/chat';
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
  const { checkExitsRoom } = useUserOnline();
  const [userId, setUserId] = useState<string | null>(null);
  const title = 'Tạo tin nhắn mới';

  const handleCreateChat = async () => {
    if (screen === 1) {
      if (!userId) {
        toast('Vui lòng thêm một nhân viên');
        return;
      }
      await checkExitsRoom(userId as string);
    } else {
      if (listUsersGroup.length <= 0) {
        toast('Vui lòng thêm một nhân viên');
        return;
      }
      if (groupName.length <= 0) {
        toast('Tên nhóm không được bỏ trống!');
        return;
      }
      const values = {
        users: listUsersGroup,
        name: groupName,
        type: 'group',
      };

      await createGroupChat(values);
    }
    handleOk();
    setIsRenderListMessage(!isRenderListMessage);
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
