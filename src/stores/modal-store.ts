import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
  type: string;
}

const initialState: ModalState = {
  isOpen: false,
  type: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleShowModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    handleSetTitle: (state, payload) => {
      const { type, parent } = payload.payload;
      state.type = type;
    },
    handleCloseModal: (state) => {
      state.isOpen = false;
      state.type = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleShowModal, handleSetTitle, handleCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
