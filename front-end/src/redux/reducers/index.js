import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import currencyReducer from "./currencyReducer";
import productsReducer from "./productsReducer";
import basketReducer from "./basketReducer";

export default combineReducers({
  category: categoryReducer,
  currency: currencyReducer,
  products: productsReducer,
  basket: basketReducer
});
