import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counterSlice';
import membersReducer from './members-store';
import modalReducer from './modal-store';
import resourceReducer from './resource-store';
import SocketReducer from './socket';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    resource: resourceReducer,
    members: membersReducer,
    socket: SocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
