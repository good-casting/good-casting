import messageService from '../service/message.service';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const messageList = createAsyncThunk('MESSAGE_LIST', async () => {
    const response = await messageService.messageList();
    return response.data;
});

export const deleteMessage = createAsyncThunk('DELETE_MESSAGE', async (arg) => {
    const response = await messageService.deleteMessage(arg);
    return response.data;
});

export const updateMessage = createAsyncThunk('READ_MESSAGE', async (arg) => {
    console.log(arg);
    arg.readMessage = !arg.readMessage;
    console.log(arg.readMessage);

    const response = await messageService.readMessage(arg);

    console.log(response.data);
    return response.data;
});

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messageList: [],
    },
    reducers: {
        readMessage(state, { payload }) {
            console.log(payload);
            const message = state.messageList.find(
                (msg) => msg.messageId === payload
            );
            message.readMessage = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(messageList.fulfilled, (state, { payload }) => {
                state.messageList = payload;
            })
            .addCase(deleteMessage.fulfilled, (state, { payload }) => {
                console.log(payload);
            })
            .addCase(updateMessage.fulfilled, (state, { payload }) => {
                console.log(payload);
            });
    },
});

export const messageSelector = (state) => state.messageReducer;
export const { readMessage } = messageSlice.actions;

export default messageSlice.reducer;
