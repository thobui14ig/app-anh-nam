/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import 'devextreme-react/text-area';

import CustomStore from 'devextreme/data/custom_store';
import {
  Column,
  DataGrid,
  Editing,
  FilterRow,
  Form,
  FormItem,
  HeaderFilter,
  Lookup,
  Scrolling,
} from 'devextreme-react/data-grid';
import { GroupItem, SimpleItem } from 'devextreme-react/form';
import React, { useState } from 'react';

import { deleteTasks, getTasks, insertTask, updateTask } from '../../api/Tasks/tasks.api';
import { useTask } from '../../context/task.context';
import TASKLIST from '../../type/task.type';
import ModalFilesReport from './components/ModalFilesReport';
const notesEditorOptions = { height: 200 };

function Task() {
  let stt = 1;
  const { users, setIsModalOpen } = useTask();
  const [modalId, setModalId] = useState<string | null>(null);
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
      const { data } = await getTasks();
      return data;
    }
    if (method === 'PUT') {
      const { key, values } = data;
      return updateTask(key, values);
    }
    if (method === 'POST') {
      alert();
      const { values } = data;
      console.log(values);
      // const { data: dataRturn } = await insertTask(values);
      // return dataRturn;
    }
    if (method === 'DELETE') {
      const { key } = data;
      return deleteTasks(key);
    }
  }

  const files = (data: any) => {
    const handleClickDetail = () => {
      setModalId(data?.data?.data?._id);
      setIsModalOpen(true);
    };
    return (
      <div className="cursor-pointer text-sky-400" onClick={() => handleClickDetail()}>
        Files report
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
        <HeaderFilter visible={true} />
        <FilterRow visible={true} />
        <Editing
          mode="popup"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        >
          <Form>
            <GroupItem caption="Create Task">
              <SimpleItem dataField="title" />
              <SimpleItem dataField="description" />
            </GroupItem>
            <GroupItem>
              <SimpleItem dataField="startDay" />
              <SimpleItem dataField="endDay" />
              <SimpleItem dataField="assigne" />
            </GroupItem>
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

        <Column dataField="title" caption="Tiêu đề"></Column>
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
        ></Column>

        <Column
          dataField="endDay"
          dataType="date"
          caption="Ngày kết thúc"
          format="dd/MM/yyyy"
        ></Column>
        <Column dataField="assigne" caption="assigne" width={125}>
          <Lookup dataSource={users} displayExpr="name" valueExpr="_id" />
        </Column>
        <Column dataField="createdBy" caption="Người tạo" width={125}>
          <Lookup dataSource={users} displayExpr="name" valueExpr="_id" />
        </Column>
        <Column
          dataField="createdAt"
          dataType="date"
          caption="Ngày tạo"
          format="dd/MM/yyyy"
        ></Column>
        <Column
          dataField="isUpload"
          caption="Upload"
          dataType="boolean"
          width={100}
        ></Column>
        <Column caption="Chi tiết" width={100} cellComponent={files} />
      </DataGrid>
      {modalId && <ModalFilesReport modalId={modalId} />}
    </React.Fragment>
  );
}

export default Task;
