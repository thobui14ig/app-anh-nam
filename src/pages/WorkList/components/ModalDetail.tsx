import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Modal, Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

import ApiConstant from '../../../api/apiConstant';
import { deleteFile, getFiles } from '../../../api/Tasks/tasks.api';
import { useWorkList } from '../../../context/work-list.context';
import TASKLIST from '../../../type/task.type';
interface DATAMODAL {
  dataModal: TASKLIST;
}

const ModalDetails = ({ dataModal }: DATAMODAL) => {
  const { isModalDetailOpen, setIsModalDetailOpen, user } = useWorkList();
  const [fileList, setFileList] = useState<UploadFile[]>();
  console.log(3333, fileList);

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
    action: `${ApiConstant.BASE_API_URL}/tasks/upload-report/${dataModal._id}/${user?._id}`,
    onChange: handleChange,
    multiple: true,
  };

  useEffect(() => {
    setFileList([]);
  }, [isModalDetailOpen]);

  useEffect(() => {
    const fetch = async () => {
      const { data: listFiles } = await getFiles(dataModal._id);
      setFileList(listFiles.attachments);
    };

    fetch();
  }, [isModalDetailOpen]);

  const onRemove = (file: any) => {
    return deleteFile(file._id, dataModal._id);
  };

  return (
    <Modal
      title="Chi tiết"
      open={isModalDetailOpen}
      onOk={() => setIsModalDetailOpen(false)}
      onCancel={() => setIsModalDetailOpen(false)}
      width={700}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-medium">
            Title:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            disabled
            value={dataModal.title}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="text" className="font-medium">
            Ngày bắt đầu:
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            disabled
            value={dataModal.startDay.toString()}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="font-medium">
            Ngày kết thúc:
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            disabled
            value={dataModal.startDay.toString()}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="font-medium">
            Description:
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            disabled
            value={dataModal.description}
          ></textarea>
        </div>
        <div className="flex flex-col mb-10" style={{ marginBottom: '50px' }}>
          <label htmlFor="message" className="font-medium">
            Files:
          </label>
          <Upload {...props} fileList={fileList} onRemove={onRemove}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetails;
