import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';

import ApiConstant from '../../../../api/apiConstant';
import { getFilesRoom } from '../../../../api/Tasks/tasks.api';
import { useChat } from '../../../../context/app.context';

export default function ModalFilesRoom({ isModalFiles, setModalFiles, roomId }: any) {
  const { currentUser } = useChat();
  const [fileList, setFileList] = useState<UploadFile[]>();

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };
  const props = {
    action: `${ApiConstant.BASE_API_URL}/tasks/upload-file-room/${roomId}/${currentUser?._id}`,
    onChange: handleChange,
    multiple: true,
  };

  useEffect(() => {
    const fetch = async () => {
      const { data: listFiles } = await getFilesRoom(roomId);
      const newData = listFiles.attachments.map((item: any) => {
        return {
          ...item,
          status: 'done',
          url: `${ApiConstant.BASE_API_URL}/tasks/attachment/${item?.path}`,
        };
      });
      setFileList(newData);
    };

    fetch();
  }, [isModalFiles]);

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalFiles}
        onOk={() => setModalFiles(false)}
        onCancel={() => setModalFiles(false)}
      >
        <Upload {...props} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>
    </>
  );
}
