/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../stores/store';
interface TaskState {
  users: any;
}

export const TaskContext = React.createContext<TaskState>({
  users: undefined,
});

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
