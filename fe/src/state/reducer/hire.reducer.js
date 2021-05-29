import hireService from '../service/hire.service';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const hireList = createAsyncThunk('HIRE_LIST', async (pageRequest) => {
    console.log("createAsyncThunk enter: " + JSON.stringify(pageRequest))
    const response = await hireService.hireList(pageRequest)
    return response.data;
})

const hireSlice = createSlice({
    name: 'hire',
    initialState: {
        hireList: [],
        pageList: [],
        page: 0,
        size: 0,
        totalPage: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(hireList.fulfilled, (state, { payload }) => {
            console.log("payload: " + JSON.stringify(payload))
            state.hireList.push(...payload.dtoList)
            state.page = payload.page
            state.pageList = payload.pageList
            state.size = payload.size
            state.totalPage = payload.totalPage
        })


    }
})

export const hireSelector = (state) => state.hireReducer;

export const {} = hireSlice.actions
export default hireSlice.reducer
