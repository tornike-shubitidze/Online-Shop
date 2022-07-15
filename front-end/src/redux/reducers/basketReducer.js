import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual } from "../../utils";

let basketReducer = createSlice({
  name: 'basket',
  initialState: { products: [] },
  reducers: {
    addToBasket(state, action) {
      const newItem = JSON.parse(JSON.stringify(action.payload));
      const sameProduct = state.products.find(x => {
        return shallowEqual(x, newItem)
      }) ?? {};

      if (Object.keys(sameProduct).length !== 0) {
        sameProduct.quantity = sameProduct.quantity + 1;

      } else {
        let product = newItem;
        product.quantity = 1;
        state.products.push(product);
      }
    },
    onIncreaseQuantity(state, action) {
      const increaseProduct = state.products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      increaseProduct.quantity = increaseProduct.quantity + 1;

    },
    onDecreaseQuantity(state, action) {
      const decreaseProduct = state.products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      const quantityIsMoreThanOne = decreaseProduct.quantity > 1;

      if (quantityIsMoreThanOne) {
        decreaseProduct.quantity = decreaseProduct.quantity - 1;
      } else {
        state.products = state.products.filter(x => JSON.stringify(x) !== JSON.stringify(action.payload))
      }
    }
  }
}
);

export const { addToBasket, onIncreaseQuantity, onDecreaseQuantity } = basketReducer.actions

export default basketReducer.reducer;