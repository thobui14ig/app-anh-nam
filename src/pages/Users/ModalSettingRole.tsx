import { Checkbox, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';

import { createRoles, getRoles } from '../../api/Users/user.api';

const ModalSettingRole = ({
  isModalOpen,
  setIsModalOpen,
  userId,
}: {
  isModalOpen: any;
  setIsModalOpen: any;
  userId: any;
}) => {
  const [roles, setRoles] = useState({
    isCreate: false,
    isUpdate: false,
    isDelete: false,
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getRoles(userId);
      setRoles({
        isCreate: data?.cUser,
        isUpdate: data?.uUser,
        isDelete: data?.dUser,
      });
    };
    fetch();
  }, [userId]);

  const handleCreateChange = (event: CheckboxChangeEvent) => {
    setRoles({ ...roles, isCreate: event.target.checked });
  };

  const handleUpdateChange = (event: CheckboxChangeEvent) => {
    setRoles({ ...roles, isUpdate: event.target.checked });
  };

  const handleDeleteChange = (event: CheckboxChangeEvent) => {
    setRoles({ ...roles, isDelete: event.target.checked });
  };

  const handleOk = async () => {
    createRoles({
      roles,
      userId,
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Phân quyền sâu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>
          <Checkbox checked={roles.isCreate ? true : false} onChange={handleCreateChange}>
            Thêm user
          </Checkbox>
          <Checkbox checked={roles.isUpdate ? true : false} onChange={handleUpdateChange}>
            Sửa user
          </Checkbox>
          <Checkbox checked={roles.isDelete ? true : false} onChange={handleDeleteChange}>
            Xóa User
          </Checkbox>
        </div>
      </Modal>
    </>
  );
};

export default ModalSettingRole;
