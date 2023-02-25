import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const membersSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleShowMemberModal: (state) => {
      state.isOpen = true;
    },
    handleCancleMemberModal: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleShowMemberModal, handleCancleMemberModal } = membersSlice.actions;

export default membersSlice.reducer;
