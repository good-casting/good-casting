import hireService from "../service/hire.service";
import Swal from "sweetalert2";

const sweetalert = (icon, title, text, footer) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    footer: footer
  });
};

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const hireList = createAsyncThunk("HIRE_LIST", async pageRequest => {
  console.log("createAsyncThunk enter: " + JSON.stringify(pageRequest));
  if (pageRequest.page === 0) {
    return null;
  }
  const response = await hireService.hireList(pageRequest);
  return response.data;
});

export const myHireList = createAsyncThunk("MYHIRE_LIST", async pageRequest => {
  console.log(
    "reducer myHireList() pageRequest: " + JSON.stringify(pageRequest)
  );
  const response = await hireService.hireList(pageRequest);
  return response.data;
});

export const hireDetail = createAsyncThunk("HIRE_DETAIL", async id => {
  console.log("createAsyncThunk enter: " + JSON.stringify(id));

  const response = await hireService.hireDetail(id);

  console.log("hireDetail: " + response.data);

  return response.data;
});

export const hireRegister = createAsyncThunk("HIRE_REGISTER", async arg => {
  console.log("createAsyncThunk hireRegister enter: " + JSON.stringify(arg));
  const response = await hireService.hireRegister(arg);
  return response.data;
});

export const hireDelete = createAsyncThunk("HIRE_DELETE", async id => {
  console.log("createAsyncThunk enter: " + JSON.stringify(id));
  const response = await hireService.hireDelete(id);
  console.log("hireDelete: " + response.data);
  return response.data;
});
const initialState = {
  pageRequest: {
    page: 1,
    size: 10,
    type: "",
    sort: "hireId",
    searchKey: {},
    period: {},
    pay: {},
    file: {
      fileName: "",
      uuid: ""
    }
  },
  pageResult: {
    pageList: [],
    dtoList: [],
    page: 1,
    size: 10,
    totalPage: 0,
    start: 0,
    end: 0,
    prev: false,
    next: false,
    totalElement: 0
  },
  hireDetail: {},
  reset: false,
  hire: {
    deadline: "",
    producer: {}
  }
};

const hireSlice = createSlice({
  name: "hire",
  initialState: initialState,
  reducers: {
    pageListChange: (state, { payload }) => {
      state.pageResult.page = payload;
    },
    resetHireSearch: (state = initialState) => {
      return {
        ...initialState,
        reset: !state.reset
      };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(hireList.fulfilled, (state, { payload }) => {
        console.log("payload: " + JSON.stringify(payload));

        if (!payload) {
          state.page = 1;
          return state;
        }

        return {
          ...state,
          pageResult: payload,
          pageRequest: payload.pageRequest
        };
      })
      .addCase(hireDetail.fulfilled, (state, { payload }) => {
        console.log("hireDetail payload: " + JSON.stringify(payload));
        return {
          ...state,
          hire: payload
        };
      })
      .addCase(hireRegister.fulfilled, (state, { payload }) => {
        console.log("payload : " + JSON.stringify(payload));
        Swal.fire({
          icon: "success",
          title: "공고가 등록되었습니다."
        });
      })
      .addCase(myHireList.fulfilled, (state, { payload }) => {
        console.log("payload :" + JSON.stringify(payload));
        return {
          ...state,
          pageResult: { ...payload }
        };
      });
  }
});

export const hireSelector = state => state.hireReducer;

export const { pageListChange, resetHireSearch } = hireSlice.actions;
export default hireSlice.reducer;
