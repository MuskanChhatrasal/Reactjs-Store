import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AddProductState = {
  loading: boolean;
  error: string;
};

const initialState: AddProductState = {
  loading: false,
  error: "",
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (values: any) => {
    return fetch("https://upayments-studycase-api.herokuapp.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbmNoaGF0cmFzYWxAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL011c2thbkNoaGF0cmFzYWwiLCJpYXQiOjE2NjE2MDUxMDksImV4cCI6MTY2MjAzNzEwOX0.3jmLABTdQMdJbHRWVmVGTA7fcOZxyiH0Ykbm-yBO-No"}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
  }
);

export const addItem = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(addProduct.pending, (state: AddProductState) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state: AddProductState) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addProduct.rejected, (state: AddProductState) => {
      state.loading = false;
      state.error = "Failed to load";
    });
  },
});

export default addItem.reducer;
