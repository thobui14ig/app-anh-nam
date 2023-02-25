import { createSlice } from '@reduxjs/toolkit';

export interface ResourceState {
  teamId: string;
  resourceTitle: string;
  listUsers: any;
}

const initialState: ResourceState = {
  teamId: 'false',
  resourceTitle: '',
  listUsers: undefined,
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
  },
});

// Action creators are generated for each case reducer function
export const { setResource, setResourceTitle, setListUsers } = resource.actions;

export default resource.reducer;
