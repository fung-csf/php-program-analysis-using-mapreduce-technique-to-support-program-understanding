import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    functionGraphData: "",
    classGraphData: "",
    packageGraphData: "",
    disableGraph: true,
  },
  reducers: {
    setValueFunction: (state, action) => {
      state.functionGraphData = action.payload;
    },
    setValueClass: (state, action) => {
      state.classGraphData = action.payload;
    },
    setValuePackage: (state, action) => {
      state.packageGraphData = action.payload;
    },
    setGraphDisable: (state, action) => {
      state.disableGraph = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setValueFunction,
  setValueClass,
  setValuePackage,
  setGraphDisable
} = counterSlice.actions;

export default counterSlice.reducer;
