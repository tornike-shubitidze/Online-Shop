import { createSlice } from "@reduxjs/toolkit";

let productsReducer = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.products
    }
  }
});

export const { setProducts } = productsReducer.actions

export default productsReducer.reducer;
