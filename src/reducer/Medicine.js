
import { createSlice } from "@reduxjs/toolkit";

const medicine = createSlice({
  name: "medicine",
  initialState: [],
  reducers: {
    getMedicine: (state, payload) => {
      return payload.payload;
    },
    removeMedicine: (state, payload) => {
      return [];
    },
  },
});

const { actions, reducer } = medicine;

export const { getMedicine, removeMedicine } = actions;

export default reducer;
