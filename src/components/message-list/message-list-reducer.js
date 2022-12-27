import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const messageListSlice = createSlice({
  name: 'messageList',
  initialState,
  reducers: {
    updateAllMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { updateAllMessages } = messageListSlice.actions;

export const selectMessages = (state) => state.messageList.messages;

export default messageListSlice.reducer;
