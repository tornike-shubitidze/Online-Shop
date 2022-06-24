import { INCREASE_QUANTITY, ADD_TO_BASKET, DECREASE_QUANTITY } from "../actions";
import { shallowEqual } from "../../utils";

let basketReducer = (state = {
  products: []
}, action) => {
  const products = state.products;

  switch (action.type) {
    case ADD_TO_BASKET:
      const sameProduct = products.find(x => {
        return shallowEqual(x, action.payload)
      }) ?? {};

      if (Object.keys(sameProduct).length !== 0) {
        sameProduct.quantity = sameProduct.quantity + 1;
        return {
          ...state,
          products: products
        };
      } else {
        let product = action.payload;
        product.quantity = 1;
        products.push(product);

        return {
          ...state,
          products: products
        };
      }

    case INCREASE_QUANTITY:
      const increaseProduct = products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      increaseProduct.quantity = increaseProduct.quantity + 1;

      return {
        ...state,
        products: products
      };

    case DECREASE_QUANTITY:
      const decreaseProduct = products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      const productsQuantityIsMoreThanOne = decreaseProduct.quantity > 1;

      if (productsQuantityIsMoreThanOne) {
        decreaseProduct.quantity = decreaseProduct.quantity - 1;
      }

      return {
        ...state,
        products: !productsQuantityIsMoreThanOne ? products.filter(x => JSON.stringify(x) !== JSON.stringify(action.payload)) : products
      };

    default:
      return state;
  }
};

export default basketReducer;
