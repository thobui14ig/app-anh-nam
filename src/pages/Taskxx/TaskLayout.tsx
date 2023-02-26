import { DatePicker } from 'antd';
import React, { useState } from 'react';

import Calendar from '../../components/Calendar';

const { RangePicker } = DatePicker;

const TaskLayout = () => {
  const [selectedRange, setSelectedRange] = useState([]);

  const handleDateRangeChange = (dates: any) => {
    setSelectedRange(dates);
  };

  return <Calendar />;
};

export default TaskLayout;
