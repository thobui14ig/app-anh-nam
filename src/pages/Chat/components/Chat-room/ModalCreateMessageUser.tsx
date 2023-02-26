import { Modal, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
const { Option } = Select;

import { useChat } from '../../../../context/app.context';
import useUserOnline from '../../modules/useUserOnline';

const ModalCreateMessageUser: React.FC = () => {
  const { handleCancel, handleOk, isModalOpen, screen, listUsers, currentUser } =
    useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const [userId, setUserId] = useState<string>('');
  const title = screen === 1 ? 'Tạo tin nhắn mới' : 'Tạo nhóm';

  function handleChange(value: string) {
    setUserId(value);
  }

  const handleCreateChat = () => {
    handleGetCurrentChat(userId);
    handleOk();
  };

  const renderUsers = () => {
    return (
      <>
        {listUsers &&
          Object?.keys(listUsers)?.map((key) => {
            if (currentUser._id !== key) {
              return (
                <Option key={key} value={key}>
                  {listUsers[key]}
                </Option>
              );
            }
          })}
      </>
    );
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleCreateChat}
        onCancel={handleCancel}
      >
        <Select
          showSearch
          placeholder={screen === 1 ? 'Select a person' : 'Add user'}
          optionFilterProp="children"
          onChange={handleChange}
          defaultValue=""
          filterOption={(input, option) =>
            (option?.children as unknown as DefaultOptionType)
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          {renderUsers()}
        </Select>
        {screen !== 1 && <div>Danh sách thành viên</div>}
      </Modal>
    </>
  );
};

export default ModalCreateMessageUser;
