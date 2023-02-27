import { Form, Input, Modal } from 'antd';
import React from 'react';

import { useWorkList } from '../../../context/work-list.context';

const ModalDetails: React.FC = () => {
  const { isModalDetailOpen, setIsModalDetailOpen } = useWorkList();

  return (
    <Modal
      title="Chi tiết"
      open={isModalDetailOpen}
      onOk={() => setIsModalDetailOpen(false)}
      onCancel={() => setIsModalDetailOpen(false)}
      width={700}
    >
      <Form.Item>
        <label>123213</label>
        <br />
        <Form.Item>
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <label>123213</label>
        <br />
        <Form.Item>
          <Input />
        </Form.Item>
      </Form.Item>
    </Modal>
  );
};

export default ModalDetails;
