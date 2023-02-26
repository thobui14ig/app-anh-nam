import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { Button } from 'devextreme-react/button';
import {
  Column,
  DataGrid,
  Editing,
  Lookup,
  Scrolling,
  Summary,
  TotalItem,
} from 'devextreme-react/data-grid';
import { SelectBox } from 'devextreme-react/select-box';
import React, { useState } from 'react';

import { getTasks, insertTask } from '../../api/Tasks/tasks.api';
import { useTask } from '../../context/task.context';
const URL = 'http://localhost:9000/tasks';

const REFRESH_MODES = ['full', 'reshape', 'repaint'];

function ReportHOC() {
  const { users } = useTask();
  const [ordersData] = useState(
    new CustomStore({
      key: '_id',
      load: () => sendRequest(`${URL}`),
      insert: (values) =>
        sendRequest(`${URL}`, 'POST', {
          values,
        }),
      update: (key, values) =>
        sendRequest(`${URL}/UpdateOrder`, 'PUT', {
          key,
          values: JSON.stringify(values),
        }),
      remove: (key) =>
        sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
          key,
        }),
    }),
  );

  const [customersData] = useState(
    new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load: () => sendRequest(`${URL}/CustomersLookup`),
    }),
  );

  const [shippersData] = useState(
    new CustomStore({
      key: 'Value',
      loadMode: 'raw',
      load: () => sendRequest(`${URL}/ShippersLookup`),
    }),
  );

  const [requests, setRequests] = useState([]);
  const [refreshMode, setRefreshMode] = useState('reshape');

  async function sendRequest(url, method = 'GET', data = {}) {
    logRequest(method, url, data);

    if (method === 'GET') {
      const { data } = await getTasks();
      return data;
    }
    const { values } = data;
    const { data: dataRturn } = await insertTask(values);
    return dataRturn;
  }

  function logRequest(method, url, data) {
    const args = Object.keys(data || {})
      .map((key) => `${key}=${data[key]}`)
      .join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');
    const request = [time, method, url.slice(URL.length), args].join(' ');

    setRequests((prevRequests) => [request, ...prevRequests]);
  }

  function clearRequests() {
    setRequests([]);
  }

  function handleRefreshModeChange(e) {
    setRefreshMode(e.value);
  }

  return (
    <React.Fragment>
      <DataGrid
        id="grid"
        showBorders={true}
        dataSource={ordersData}
        repaintChangesOnly={true}
      >
        <Editing
          refreshMode={refreshMode}
          mode="popup"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        <Scrolling mode="virtual" />

        <Column dataField="title"></Column>

        <Column dataField="startDay" dataType="date"></Column>

        <Column dataField="endDay" dataType="date"></Column>
        <Column dataField="assigne" caption="assigne" width={125}>
          <Lookup dataSource={users} displayExpr="name" valueExpr="_id" />
        </Column>
      </DataGrid>
    </React.Fragment>
  );
}

export default ReportHOC;
