import fileService from "../service/file.service";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fileRegister = createAsyncThunk(
  "FILE_REGISTER",
  async formData => {
    const response = await fileService.fileRegister(formData);
    response.data.forEach(file => {
      if (file.fileName.includes(".jp")) {
        file.photoType = true;
      }
    });
    console.log(response.data);
    return response.data;
  }
);
const initialState = {
  fileList: [],
  reset: false
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {
    resetFile: (state = initialState) => {
      return {
        ...initialState,
        reset: !state.reset
      };
    },
    deleteFile(state, { payload }) {
      state.fileList = state.fileList.filter(file => file.uuid !== payload);
    },
    setFirst(state, { payload }) {
      const chFileProp = state.fileList.find(
        file => file.uuid === payload.uuid
      );
      chFileProp.first = true;
    }
  },
  extraReducers: builder => {
    builder.addCase(fileRegister.fulfilled, (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        fileList: state.fileList.concat(payload)
      };
    });
  }
});

export const fileSelector = state => state.fileReducer;
export const { deleteFile, setFirst, resetFile } = fileSlice.actions;

export default fileSlice.reducer;
