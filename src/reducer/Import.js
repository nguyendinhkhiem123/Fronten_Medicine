
import { createSlice } from "@reduxjs/toolkit";

const imports  = createSlice({
  name: "import",
  initialState: [],
  reducers: {
    addImport: (state, payload) => {
      return payload.payload;
    },
    removeImport: (state, payload) => {
      return [];
    },
  },
});

const { actions, reducer } = imports;

export const { addImport, removeImport } = actions;

export default reducer;
