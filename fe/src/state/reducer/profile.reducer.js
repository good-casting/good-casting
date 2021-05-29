import profileService from '../service/profile.service';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const profileList = createAsyncThunk('PROFILE_LIST', async (pageRequest) => {
    console.log('reducer profileList() pageRequest: ' + JSON.stringify(pageRequest));
    const response = await profileService.profileList(pageRequest);

    return response.data;
});

export const profileRead = createAsyncThunk('PROFILE_DETAIL', async() => {
    const response = await profileService.profileRead();
    return response.data;

});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileList: [],
        pageList: [],
        page: 0,
        size: 0,
        totalPage: 0,
        profile: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(profileList.fulfilled, (state, { payload }) => {
                console.log("payload :" + JSON.stringify(payload))
                state.profileList.push(...payload.dtoList)
                state.page = payload.page
                state.pageList = payload.pageList
                state.size = payload.size
                state.totalPage = payload.totalPage
               });
        builder
            .addCase(profileRead.fulfilled, (state, {payload}) => {
                console.log("payload : " + JSON.stringify(payload))
                state.profile = payload
            })
    }
})
export const profileSelector = (state) => state.profileReducer;

export const { } = profileSlice.actions;
export default profileSlice.reducer;