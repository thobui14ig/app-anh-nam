/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

const DropdownRemoveEdit = ({ messageId, handleRemoveMessage }: any) => {
  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: (
        <span
          className="flex justify-center items-center"
          // onClick={() => handleRemoveMessage(messageId)}
        >
          Edit
          <EditOutlined className="pl-2" />
        </span>
      ),
    },
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
    <Dropdown menu={{ items }} className="pr-1 pb-5 cursor-pointer" trigger={['click']}>
      <DownOutlined />
    </Dropdown>
  );
};

export default DropdownRemoveEdit;
