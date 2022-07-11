import categoryReducer from "./categoryReducer";
import currencyReducer from "./currencyReducer";
import productsReducer from "./productsReducer";
import basketReducer from "./basketReducer";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import middlewares from "../middlewares";


export const store = configureStore({
  reducer: {
    category: categoryReducer,
    currency: currencyReducer,
    products: productsReducer,
    basket: basketReducer
  }
});