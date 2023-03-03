import { Modal, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

import ApiConstant from '../../../api/apiConstant';
import { getFiles } from '../../../api/Tasks/tasks.api';
import { useTask } from '../../../context/task.context';

const ModalFilesReport = ({ modalId }: { modalId: string }) => {
  const { setIsModalOpen, isModalOpen } = useTask();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const { data: listFiles } = await getFiles(modalId);
      const newData = listFiles.attachments.map((item: any) => {
        return {
          ...item,
          status: 'done',
          url: `${ApiConstant.BASE_API_URL}/tasks/attachment/${item.name}`,
        };
      });
      setFileList(newData);
    };

    fetch();
  }, [modalId]);

  return (
    <>
      <Modal
        title="Danh sach file report"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Upload fileList={fileList}></Upload>
      </Modal>
    </>
  );
};

export default ModalFilesReport;
