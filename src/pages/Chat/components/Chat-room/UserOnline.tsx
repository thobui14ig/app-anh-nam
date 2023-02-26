/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Tabs, TabsProps } from 'antd';
import React from 'react';

import { useChat } from '../../../../context/app.context';
import ListMessageGroups from './ListMessageGroup';
import ListMessageUser from './ListMessageUsers';
import ModalCreateMessageUser from './ModalCreateMessageUser';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `User`,
    children: <ListMessageUser />,
  },
  {
    key: '2',
    label: `Group`,
    children: <ListMessageGroups />,
  },
];

const ListMessage = () => {
  const { showModal, setScreen } = useChat();
  const onChange = (key: string) => {
    setScreen(Number(key));
  };
  return (
    <>
      <div className="bg-gray-200 w-1/4 p-4">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className="text-gray-700 font-medium pb-2">Danh sách tin nhắn</div>
          <button className="text-gray-700 font-medium pb-2" onClick={() => showModal()}>
            +
          </button>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      <ModalCreateMessageUser />
    </>
  );
};

export default ListMessage;
