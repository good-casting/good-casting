import actorService from "../service/actor.service";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const updateActorInfo = createAsyncThunk("ACTOR_UPDATE", async arg => {
  console.log("------------ACTOR_UPDATE---------------");
  console.log(arg);
  console.log("---------------------------------------");
  const response = await actorService.updateActorInfo(arg);
  return response.data;
});

export const getActorInfo = createAsyncThunk("ACTOR_INFO", async () => {
  console.log("------------ACTOR_INFO---------------");
  const response = await actorService.getActorInfo();
  return response.data;
});

export const unRegister = createAsyncThunk("UNREGISTER", async arg => {
  console.log("------------UNREGISTER---------------");
  const response = await actorService.unRegister(arg);
  console.log("-------------------------------------");

  return response.data;
});

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actor: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getActorInfo.fulfilled, (state, { payload }) => {
        state.actor = payload;
      })
      .addCase(updateActorInfo.fulfilled, (state, { payload }) => {
        state.actor = payload;
      })
      .addCase(unRegister.fulfilled, (state, { payload }) => {});
  }
});

export const actorSelector = state => state.actorReducer;

export default actorSlice.reducer;
