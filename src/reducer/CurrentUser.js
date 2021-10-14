import { createSlice } from "@reduxjs/toolkit";

const currentUser = createSlice({
  name: "currentUser",
  initialState: {},
  reducers: {
    addCurrentUser: (state, payload) => {
      return payload.payload;
    },
    updateCurentUser: (state, payload) => {
        return payload.payload;
    },
    removeCurrentUser: (state, payload) => {
      return {};
    },
  },
});

const { actions, reducer } = currentUser;

export const { addCurrentUser, updateCurentUser, removeCurrentUser } = actions;

export default reducer;
