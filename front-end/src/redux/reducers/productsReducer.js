// import { INITIALIZE, SET_CATEGORY } from "../actions";
import { createSlice } from "@reduxjs/toolkit";

let productsReducer = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    productsInitialize(state, action) {
      console.log('came into products reducer');
      return {
        ...state,
        products: action.payload.products,
      };
    },
    setProducts(state, action) {
      return {
        ...state,
        products: action.payload.products,
      };
    }
  }
});

export const { productsInitialize, setProducts } = productsReducer.actions

export default productsReducer.reducer;
