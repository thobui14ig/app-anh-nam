/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

const DropdownRemove = ({ messageId, handleRemoveMessage }: any) => {
  const items: MenuProps['items'] = [
    {
      key: 'delete',
      danger: true,
      label: (
        <span
          className="flex justify-center items-center"
          onClick={() => handleRemoveMessage(messageId)}
        >
          Xoá
          <DeleteOutlined className="pl-2" />
        </span>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} className="pl-2 pb-7 cursor-pointer" trigger={['click']}>
      <DownOutlined />
    </Dropdown>
  );
};

export default DropdownRemove;
