import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Modal, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

import { useTask } from '../../../context/task.context';

const ModalFilesReport: React.FC = () => {
  const { setIsModalOpen, isModalOpen } = useTask();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);

  return (
    <>
      <Modal
        title="Danh sach file report"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        file1
      </Modal>
    </>
  );
};

export default ModalFilesReport;
