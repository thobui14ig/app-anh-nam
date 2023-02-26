import { createSlice } from '@reduxjs/toolkit';

export interface ResourceState {
  teamId: string;
  resourceTitle: string;
  listUsers: any;
  users: any;
}

const initialState: ResourceState = {
  teamId: 'false',
  resourceTitle: '',
  listUsers: undefined,
  users: undefined,
};

export const resource = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setResource: (state, payload) => {
      const { id } = payload.payload;
      state.teamId = id;
    },
    setResourceTitle: (state, payload) => {
      state.resourceTitle = payload.payload;
    },
    setListUsers: (state, payload) => {
      state.listUsers = payload?.payload;
    },
    setUsers: (state, payload) => {
      state.users = payload?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResource, setResourceTitle, setListUsers, setUsers } = resource.actions;

export default resource.reducer;
