import { createSlice } from "@reduxjs/toolkit";
// import { INITIALIZE, SET_CATEGORY } from "../actions";


let categoryReducer = createSlice({
  initialized: false,
  name: "categories",
  initialState: [],
  reducers: {
    initialize(state, action) {
      return {
        initialized: true,
        categories: action.payload.categories,
      }
    },
    setCategory(state, action) {
      state.categories.map(x => {
        x.name === action.payload.categoryName ? x.selected = true : x.selected = false;
        return x;
      });
    }
  }
});

export const { initialize, setCategory } = categoryReducer.actions

export default categoryReducer;
