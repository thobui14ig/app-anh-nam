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

import { getTasks } from '../../api/Tasks/tasks.api';
import { useWorkList } from '../../context/work-list.context';
import TASKLIST from '../../type/task.type';
import ModalDetails from './components/ModalDetail';
const notesEditorOptions = { height: 200 };

function WorkList() {
  let stt = 1;
  const { users, setIsModalDetailOpen } = useWorkList();
  const [dataModal, setDataModal] = useState<TASKLIST | null>(null);

  const [ordersData] = useState(
    new CustomStore({
      key: '_id',
      load: () => sendRequest(),
    }),
  );

  async function sendRequest(method = 'GET') {
    if (method === 'GET') {
      const { data } = await getTasks();
      return data;
    }
  }

  const details = (data: any) => {
    const handleClickDetail = () => {
      setIsModalDetailOpen(true);
      setDataModal(data?.data?.data);
    };
    return (
      <div className="cursor-pointer text-sky-400" onClick={() => handleClickDetail()}>
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
        <Column caption="Chi tiết" width={100} cellComponent={details} />
      </DataGrid>
      {dataModal && <ModalDetails dataModal={dataModal} />}
    </React.Fragment>
  );
}

export default WorkList;
