
import { createSlice } from "@reduxjs/toolkit";

const order = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addOrder: (state, payload) => {
      return payload.payload;
    },
    removeOrder: (state, payload) => {
      return [];
    },
  },
});

const { actions, reducer } = order;

export const { addOrder, removeOrder } = actions;

export default reducer;
