import { configureStore } from '@reduxjs/toolkit';
import messageListReducer from '../components/message-list/message-list-reducer';

export const store = configureStore({
  reducer: {
    messageList: messageListReducer,
  },
});
