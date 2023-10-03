// todoSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  loggedinUser: {},
  application: {},
};

const userSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    loggedinUser: (state, action) => {
      state.loggedinUser = action.payload;
    },
    application: (state, action) => {
      state.application = action.payload;
    },
  },
});

export const { addUser, loggedinUser, application } = userSlice.actions;
export default userSlice.reducer;
