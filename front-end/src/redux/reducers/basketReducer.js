// import { INCREASE_QUANTITY, ADD_TO_BASKET, DECREASE_QUANTITY } from "../actions";
import { createSlice } from "@reduxjs/toolkit";

import { shallowEqual } from "../../utils";

let basketReducer = createSlice({
  name: 'basket',
  initialState: [],
  reducers: {
    addToBasket(state, action) {
      let products = state.products;

      const newItem = JSON.parse(JSON.stringify(action.payload));
      const sameProduct = products.find(x => {
        return shallowEqual(x, newItem)
      }) ?? {};

      if (Object.keys(sameProduct).length !== 0) {
        sameProduct.quantity = sameProduct.quantity + 1;
        return {
          ...state,
          products: products
        };
      } else {
        let product = newItem;
        product.quantity = 1;
        products.push(product);

        return {
          ...state,
          products: products
        };
      }
    },
    onIncreaseQuantity(state, action) {
      let products = state.products;

      const increaseProduct = products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      increaseProduct.quantity = increaseProduct.quantity + 1;

      return {
        ...state,
        products: products
      };
    },
    onDecreaseQuantity(state, action) {
      let products = state.products;

      const decreaseProduct = products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      const quantityIsMoreThanOne = decreaseProduct.quantity > 1;

      if (quantityIsMoreThanOne) {
        decreaseProduct.quantity = decreaseProduct.quantity - 1;
      } else {
        products = products.filter(x => JSON.stringify(x) !== JSON.stringify(action.payload))
      }

      return {
        ...state,
        products: products
      };
    }
  }
}
);

export const { addToBasket, onIncreaseQuantity, onDecreaseQuantity } = basketReducer.actions

export default basketReducer.reducer;