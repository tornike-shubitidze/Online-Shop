// import { INITIALIZE, SET_CATEGORY } from "../actions";
import { createSlice } from "@reduxjs/toolkit";

let productsReducer = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    initialize(state, action) {
      return {
        ...state,
        products: action.payload.products,
      };
    },
    setCategory(state, action) {
      return {
        ...state,
        products: action.payload.products,
      };
    }
  }
});

export const { initialize, setCategory } = productsReducer.actions

export default productsReducer;
