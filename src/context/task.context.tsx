/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TaskType, { getTasks } from '../api/Tasks/tasks.api';
import { getUserLocal } from '../helper';
import { RootState } from '../stores/store';
interface TaskState {
  users: any;
}

export const TaskContext = React.createContext<TaskState>({
  users: undefined,
});

export enum SCREEN_TYPE {
  USER = 1,
  GROUP = 2,
}

const TaskProvider = ({ children }: any) => {
  const { users } = useSelector((state: RootState) => state.resource);

  const values = {
    users,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

export const useTask = (): TaskState => {
  return useContext(TaskContext);
};
