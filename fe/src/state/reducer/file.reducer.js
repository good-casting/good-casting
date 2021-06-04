import fileService from '../service/file.service';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fileRegister = createAsyncThunk(
    'FILE_REGISTER',
    async (formData) => {
        const response = await fileService.fileRegister(formData);

        response.data.forEach((file) => {
            if (file.fileName.includes('.jp')) {
                file.photoType = true;
            }
        });

        console.log(response.data);

        return response.data;
    }
);

export const fileDelete = createAsyncThunk('FILE_DELETE', async (arg) => {
    const response = await fileService.fileDelete(arg);
    return response.data;
});

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        fileList: [],
    },
    reducers: {
        deleteFile(state, { payload }) {
            state.fileList = state.fileList.filter(
                (file) => file.uuid !== payload
            );
        },
        setFirst(state, { payload }) {
            const chFileProp = state.fileList.find(
                (file) => file.uuid === payload.uuid
            );
            chFileProp.first = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fileRegister.fulfilled, (state, { payload }) => {
            return {
                ...state,
                fileList: state.fileList.concat(payload),
            };
        });
    },
});

export const fileSelector = (state) => state.fileReducer;
export const { deleteFile, setFirst } = fileSlice.actions;

export default fileSlice.reducer;