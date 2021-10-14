import { createSlice } from "@reduxjs/toolkit";

const employee = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    getEmployee: (state, payload) => {
      return payload.payload;
    },
    removeEmployee: (state, payload) => {
      return [];
    },
  },
});

const { actions, reducer } = employee;

export const { getEmployee, removeEmployee } = actions;

export default reducer;
