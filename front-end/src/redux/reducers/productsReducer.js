import { createSlice } from "@reduxjs/toolkit";

let productsReducer = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
  },
  extraReducers: {
    'categories/initialize': (state, action) => {
      state.products = action.payload.products
    },
    'categories/setCategory': (state, action) => {
      state.products = action.payload.products
    },
  },
});

export default productsReducer.reducer;
