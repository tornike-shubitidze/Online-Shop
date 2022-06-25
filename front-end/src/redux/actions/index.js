export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const SET_CATEGORY = "SET_CATEGORY";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const LOAD_CURRENCIES = "LOAD_CURRENCIES";
export const SET_CURRENCY = "SET_CURRENCY";
export const INITIALIZE = "INITIALIZE";

export const ADD_TO_BASKET = "ADD_TO_BASKET";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

export function initialize(value) {
  return { type: INITIALIZE, payload: value };
}

export function loadCategories() {
  return { type: LOAD_CATEGORIES };
}

export function setCategory(value) {
  return { type: SET_CATEGORY, payload: value };
}

export function getProducts() {
  return { type: GET_PRODUCTS };
}

export function loadCurrencies() {
  return { type: LOAD_CURRENCIES };
}

export function setCurrency(value) {
  return { type: SET_CURRENCY, payload: value };
}

export function addToBasket(value) {
  return { type: ADD_TO_BASKET, payload: value };
}

export function onIncreaseQuantity(value) {
  return { type: INCREASE_QUANTITY, payload: value };
}

export function onDecreaseQuantity(value) {
  return { type: DECREASE_QUANTITY, payload: value };
}