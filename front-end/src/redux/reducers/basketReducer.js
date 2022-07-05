import { INCREASE_QUANTITY, ADD_TO_BASKET, DECREASE_QUANTITY } from "../actions";
import { shallowEqual } from "../../utils";

let basketReducer = (state = {
  products: []
}, action) => {
  let products = state.products;

  switch (action.type) {
    case ADD_TO_BASKET:
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

    case INCREASE_QUANTITY:

      const increaseProduct = products.find(x => JSON.stringify(x) === JSON.stringify(action.payload));
      increaseProduct.quantity = increaseProduct.quantity + 1;

      return {
        ...state,
        products: products
      };

    case DECREASE_QUANTITY:
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

    default:
      return state;
  }
};

export default basketReducer;