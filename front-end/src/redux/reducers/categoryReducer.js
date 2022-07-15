import { createSlice } from "@reduxjs/toolkit";


let categoryReducer = createSlice({
  name: "categories",
  initialState: {
    initialized: false,
    categories: []
  },
  reducers: {
    initialize(state, action) {
      state.initialized = true;
      state.categories = action.payload.categories
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

export default categoryReducer.reducer;
