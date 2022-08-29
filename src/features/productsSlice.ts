import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
  products: any;
  selectedProduct: any;
  loading: boolean;
  error: string;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: {},
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return fetch(`https://upayments-studycase-api.herokuapp.com/api/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbmNoaGF0cmFzYWxAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL011c2thbkNoaGF0cmFzYWwiLCJpYXQiOjE2NjE2MDUxMDksImV4cCI6MTY2MjAzNzEwOX0.3jmLABTdQMdJbHRWVmVGTA7fcOZxyiH0Ykbm-yBO-No"}`,
      },
    }).then((res) => res.json().then((data) => data.products));
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: any) => {
    return fetch(
      `https://upayments-studycase-api.herokuapp.com/api/products/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11c2thbmNoaGF0cmFzYWxAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL011c2thbkNoaGF0cmFzYWwiLCJpYXQiOjE2NjE2MDUxMDksImV4cCI6MTY2MjAzNzEwOX0.3jmLABTdQMdJbHRWVmVGTA7fcOZxyiH0Ykbm-yBO-No"}`,
        },
      }
    ).then((res) => res.json());
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchProducts.pending, (state: ProductState) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state: ProductState, action: PayloadAction<[]>) => {
        state.loading = false;
        state.error = "";
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state: ProductState) => {
      state.loading = false;
      state.products = [];
      state.error = "Failed to load";
    });

    builder.addCase(getProduct.pending, (state: ProductState) => {
      state.loading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state: ProductState, action: PayloadAction<[]>) => {
        state.loading = false;
        state.error = "";
        state.selectedProduct = action.payload;
      }
    );
    builder.addCase(getProduct.rejected, (state: ProductState) => {
      state.loading = false;
      state.selectedProduct = [];
      state.error = "Failed to load";
    });
  },
});

export default productSlice.reducer;
