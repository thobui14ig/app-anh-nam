import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket | any;
}

const initialState: SocketState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    handleSetSocket: (state, payload) => {
      state.socket = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleSetSocket } = socketSlice.actions;

export default socketSlice.reducer;
