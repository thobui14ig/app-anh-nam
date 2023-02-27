/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import 'devextreme-react/text-area';

import CustomStore from 'devextreme/data/custom_store';
import {
  Column,
  DataGrid,
  FormItem,
  Lookup,
  Scrolling,
} from 'devextreme-react/data-grid';
import React, { useState } from 'react';

import { deleteTasks, getTasks, insertTask, updateTask } from '../../api/Tasks/tasks.api';
import { useWorkList } from '../../context/work-list.context';
import ModalDetails from './components/ModalDetail';
import ModalUploadFileUpload from './components/ModalUploadFileReport';
const notesEditorOptions = { height: 200 };

function WorkList() {
  const { users, showModal, setIsModalDetailOpen } = useWorkList();

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

  async function sendRequest(method = 'GET', data = {}) {
    if (method === 'GET') {
      const { data } = await getTasks();
      return data;
    }
    if (method === 'PUT') {
      const { key, values } = data;
      return updateTask(key, values);
    }
    if (method === 'POST') {
      const { values } = data;
      const { data: dataRturn } = await insertTask(values);
      return dataRturn;
    }
    if (method === 'DELETE') {
      const { key } = data;
      return deleteTasks(key);
    }
  }

  const cellComponent = (data: any) => {
    const uploadFile = () => {
      showModal();
    };
    return (
      <div className="cursor-pointer text-sky-400" onClick={uploadFile}>
        Upload file
      </div>
    );
  };

  const details = (data: any) => {
    return (
      <div
        className="cursor-pointer text-sky-400"
        onClick={() => setIsModalDetailOpen(true)}
      >
        Chi tiết
      </div>
    );
  };

  return (
    <React.Fragment>
      <DataGrid
        id="grid"
        showBorders={true}
        dataSource={ordersData}
        repaintChangesOnly={true}
      >
        <Scrolling mode="virtual" useNative={true} />

        <Column dataField="title" caption="Tiêu đề" fixed={true} width={300}></Column>
        <Column dataField="description" visible={false}>
          <FormItem
            colSpan={2}
            editorType="dxTextArea"
            editorOptions={notesEditorOptions}
          />
        </Column>

        <Column
          dataField="startDay"
          dataType="date"
          caption="Ngày bắt đầu"
          format="dd/MM/yyyy"
          width={150}
        ></Column>

        <Column
          dataField="endDay"
          dataType="date"
          caption="Ngày kết thúc"
          format="dd/MM/yyyy"
          width={150}
        ></Column>
        <Column dataField="createdBy" caption="Người tạo" width={125}>
          <Lookup dataSource={users} displayExpr="name" valueExpr="_id" />
        </Column>
        <Column
          dataField="createdAt"
          dataType="date"
          caption="Ngày tạo"
          format="dd/MM/yyyy"
          width={150}
        ></Column>
        {/* <Column dataField="isUpload" caption="Upload" dataType="boolean"></Column> */}
        <Column caption="File" width={100} cellComponent={cellComponent} />
        <Column caption="Chi tiết" width={100} cellComponent={details} />
      </DataGrid>
      <ModalUploadFileUpload />
      <ModalDetails />
    </React.Fragment>
  );
}

export default WorkList;
