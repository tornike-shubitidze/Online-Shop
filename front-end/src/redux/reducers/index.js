import categoryReducer from "./categoryReducer";
import currencyReducer from "./currencyReducer";
import productsReducer from "./productsReducer";
import basketReducer from "./basketReducer";
import { configureStore } from "@reduxjs/toolkit";
import { categoryMiddleware } from "./../middlewares/categoryMiddlware";
import { productsMiddleware } from "./../middlewares/productsMiddlware";


export const store = configureStore({
  reducer: {
    category: categoryReducer,
    currency: currencyReducer,
    products: productsReducer,
    basket: basketReducer
  },
  middleware: [categoryMiddleware, productsMiddleware]
});