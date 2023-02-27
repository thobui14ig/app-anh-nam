/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../stores/store';
interface TaskState {
  users: any;
  setIsModalOpen: any;
  isModalOpen: any;
}

export const TaskContext = React.createContext<TaskState>({
  users: undefined,
  setIsModalOpen: undefined,
  isModalOpen: undefined,
});

const TaskProvider = ({ children }: any) => {
  const { users } = useSelector((state: RootState) => state.resource);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const values = {
    users,
    setIsModalOpen,
    isModalOpen,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

export const useTask = (): TaskState => {
  return useContext(TaskContext);
};
