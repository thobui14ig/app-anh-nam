/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import 'devextreme-react/text-area';

import { Button } from 'antd';
import CustomStore from 'devextreme/data/custom_store';
import {
  Column,
  DataGrid,
  Editing,
  FilterRow,
  Form,
  HeaderFilter,
  Lookup,
  Scrolling,
} from 'devextreme-react/data-grid';
import { SimpleItem } from 'devextreme-react/form';
import React, { useState } from 'react';

import { deleteUser, getUsers, insertUser, updateUser } from '../../api/Users/user.api';
import { getUserLocal } from '../../helper';
import { Roles } from '../../type/role.enum';
import ModalSettingRole from './ModalSettingRole';

const ListRoles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'support Admin' },
];

function Users() {
  const currentUser = getUserLocal();
  let stt = 1;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [ordersData] = useState(
    new CustomStore({
      key: '_id',
      load: () => sendRequest(),
      insert: (values) =>
        sendRequest('POST', {
          values,
        }),
      update: (key, values) =>
        sendRequest('PUT', {
          key,
          values,
        }),
      remove: (key) =>
        sendRequest('DELETE', {
          key,
        }),
    }),
  );

  async function sendRequest(method = 'GET', data: any = {}) {
    if (method === 'GET') {
      const { data } = await getUsers();
      return data;
    }
    if (method === 'PUT') {
      const { key, values } = data;
      return updateUser(key, values);
    }
    if (method === 'POST') {
      const { values } = data;

      const { data: dataRturn } = await insertUser(values);
      return dataRturn;
    }
    if (method === 'DELETE') {
      const { key } = data;
      return deleteUser(key);
    }
  }

  const phanquyen = (data: any) => {
    const handleClick = (id: string) => {
      setUserId(id);
      setIsModalOpen(true);
    };
    if (data?.data?.data?.role === 3) {
      return (
        <div
          onClick={() => handleClick(data?.data?.data?._id)}
          className="curasync sor-pointer text-sky-400 cursor-pointer"
        >
          Phân quyền
        </div>
      );
    }
    return <>No</>;
  };

  return (
    <React.Fragment>
      <DataGrid
        id="grid"
        showBorders={true}
        dataSource={ordersData}
        repaintChangesOnly={true}
      >
        <HeaderFilter visible={true} />
        <FilterRow visible={true} />
        <Editing
          mode="popup"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        >
          <Form>
            <SimpleItem dataField="name" />
            <SimpleItem dataField="email" />
            <SimpleItem dataField="password" />
            <SimpleItem dataField="role" />
          </Form>
        </Editing>

        <Scrolling mode="virtual" />
        <Column
          caption="STT"
          width={50}
          alignment="center"
          customizeText={() => {
            return String(stt++);
          }}
        />
        <Column dataField="name" caption="Tên user"></Column>

        <Column dataField="email" caption="Email"></Column>
        <Column dataField="password" visible={false}></Column>

        <Column dataField="role" caption="Role">
          <Lookup dataSource={ListRoles} displayExpr="name" valueExpr="id" />
        </Column>
        {Number(currentUser.role) === Roles.ADMIN && (
          <Column caption="Phân quyền" width={120} cellComponent={phanquyen} />
        )}
      </DataGrid>
      {userId && (
        <ModalSettingRole
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userId={userId}
        />
      )}
    </React.Fragment>
  );
}

export default Users;
