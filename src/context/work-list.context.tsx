/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../stores/store';
interface WorkListState {
  users: any;
  isModalOpen: any;
  setIsModalOpen: any;
  showModal: any;
  handleOk: any;
  handleCancel: any;
  isModalDetailOpen: any;
  setIsModalDetailOpen: any;
}

export const WorkListContext = React.createContext<WorkListState>({
  users: undefined,
  isModalOpen: undefined,
  setIsModalOpen: undefined,
  showModal: undefined,
  handleOk: undefined,
  handleCancel: undefined,
  isModalDetailOpen: undefined,
  setIsModalDetailOpen: undefined,
});

const WorkListProvider = ({ children }: any) => {
  const { users } = useSelector((state: RootState) => state.resource);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const values = {
    users,
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleOk,
    handleCancel,
    isModalDetailOpen,
    setIsModalDetailOpen,
  };

  return <WorkListContext.Provider value={values}>{children}</WorkListContext.Provider>;
};

export default WorkListProvider;

export const useWorkList = (): WorkListState => {
  return useContext(WorkListContext);
};
