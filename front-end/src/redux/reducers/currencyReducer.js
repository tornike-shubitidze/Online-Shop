import { INITIALIZE, SET_CURRENCY } from "../actions";

let currencyReducer = (state = {
  currencies: []
}, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        currencies: action.payload.currencies,
      };
    case SET_CURRENCY:
      let newState = state.currencies.map(x => {
        x.symbol === action.payload ? x.selected = true : x.selected = false;
        return x;
      })
      return { currencies: newState };

    default:
      return state;
  }
};

export default currencyReducer;