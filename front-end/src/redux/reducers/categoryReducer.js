import { INITIALIZE, SET_CATEGORY } from "../actions";

let categoryReducer = (state = {
  initialized: false,
  categories: [],
}, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        initialized: true,
        categories: action.payload.categories,
      };
    case SET_CATEGORY:
      const result = state.categories.map(x => {
        x.name === action.payload.categoryName ? x.selected = true : x.selected = false;
        return x;
      });

      return {
        ...state,
        categories: result
      };
    default:
      return state;
  }
};

export default categoryReducer;
