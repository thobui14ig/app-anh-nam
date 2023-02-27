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
const notesEditorOptions = { height: 200 };

function Task() {
  const { users } = useTask();
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

        <Column dataField="title" caption="Tiêu đề"></Column>
        <Column dataField="description">
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
        <Column dataField="isUpload" caption="Upload" dataType="boolean"></Column>
      </DataGrid>
    </React.Fragment>
  );
}

export default Task;
