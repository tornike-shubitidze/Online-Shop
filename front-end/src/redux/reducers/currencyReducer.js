// import { INITIALIZE, SET_CURRENCY } from "../actions";
import { createSlice } from "@reduxjs/toolkit";


let currencyReducer = createSlice({
  name: 'currencies',
  initialState: [],
  reducers: {
    initialize(state, action) {
      return {
        currencies: action.payload.currencies,
      };
    }
  },
  setCurrency(state, action) {
    let newState = state.currencies.map(x => {
      x.symbol === action.payload ? x.selected = true : x.selected = false;
      return x;
    })
    return { currencies: newState };
  }
});

export const { initialize, setCurrency } = currencyReducer.actions

export default currencyReducer;