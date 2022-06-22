import { INITIALIZE, SET_CATEGORY } from "../actions";

let productsReducer = (state = {
  products: []
}, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        products: action.payload.products,
      };

    case SET_CATEGORY:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export default productsReducer;
