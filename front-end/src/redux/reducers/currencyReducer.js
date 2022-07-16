import { createSlice } from "@reduxjs/toolkit";


let currencyReducer = createSlice({
  name: 'currencies',
  initialState: {
    currencies: []
  },
  reducers: {
    // initialize(state, action) {
    //   state.currencies = action.payload.currencies
    // },
    setCurrency(state, action) {
      state.currencies.map(x => {
        x.symbol === action.payload ? x.selected = true : x.selected = false;
        return x;
      })
    }
  },
  extraReducers: {
    'categories/initialize': (state, action) => {
      state.currencies = action.payload.currencies
    },
  },
});

export const { setCurrency } = currencyReducer.actions

export default currencyReducer.reducer;