import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoriesState = {
  categories: [];
  loading: boolean;
  error: string;
};

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: "",
};

export const getCategories = createAsyncThunk(
  "devices/getCategories",
  async () => {
    return fetch(
      "https://upayments-studycase-api.herokuapp.com/api/categories/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbmNoaGF0cmFzYWxAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL011c2thbkNoaGF0cmFzYWwiLCJpYXQiOjE2NjE2MDUxMDksImV4cCI6MTY2MjAzNzEwOX0.3jmLABTdQMdJbHRWVmVGTA7fcOZxyiH0Ykbm-yBO-No"}`,
        },
      }
    ).then((res) => res.json().then((data) => data.categories));
  }
);

export const categoriesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCategories.pending, (state: CategoriesState) => {
      state.loading = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state: CategoriesState, action: PayloadAction<[]>) => {
        state.loading = false;
        state.error = "";
        state.categories = action.payload;
      }
    );
    builder.addCase(
      getCategories.rejected,
      (state: CategoriesState, action: PayloadAction<[]>) => {
        state.loading = false;
        state.categories = [];
        state.error = "error";
      }
    );
  },
});

export default categoriesSlice.reducer;
