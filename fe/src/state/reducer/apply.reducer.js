import applyService from "../service/apply.service";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const hireApply = createAsyncThunk("HIRE_APPLY", async apply => {
  console.log("createAsyncThunk enter : " + JSON.stringify(apply));
  const response = await applyService.hireApply(apply);
  return response.data;
});

const applySlice = createSlice({
  name: "apply",
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(hireApply.fulfilled, (state, { payload }) => {
      console.log("payload : " + JSON.stringify(payload));
    });
  }
});

export const applySelector = state => state.hireReducer;

export const {} = applySlice.actions;
export default applySlice.reducer;
