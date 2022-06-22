import { applyMiddleware } from "redux";
import { categoryMiddleware } from './categoryMiddlware';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productsMiddleware } from "./productsMiddlware";

export default composeWithDevTools(applyMiddleware(
    categoryMiddleware,
    productsMiddleware));