import { request } from "graphql-request";
import { API_URL } from "../../GraphQL/settings";
import { GET_CURRENCIES, GET_CATEGORIES, getCategoryByName } from "../../GraphQL/Queries";
import { addActivePropertyToAttributes } from "../../utils";
import { initialize } from './../reducers/currencyReducer';
import { setProducts } from './../reducers/productsReducer';

export const categoryMiddleware = (store) => (next) => (action) => {

    switch (action.type) {
        case 'categories/initialize':
            let { payload } = action
            let categoryName = payload.includes('all') || payload.includes('tech') || payload.includes('clothes') ? payload : 'all';
            const categoryCall = request(API_URL, GET_CATEGORIES);
            const currencyCall = request(API_URL, GET_CURRENCIES);
            const productsCall = request(API_URL, getCategoryByName(categoryName));

            Promise.all([categoryCall, currencyCall, productsCall])
                .then((response) => {
                    action.payload = {
                        categories: response[0].categories.map((category, i) => { return { name: category.name, selected: category.name === categoryName } }),
                        currencies: response[1].currencies.map((x, i) => { return { label: x.label, symbol: x.symbol, selected: i === 0 } }),
                        products: addActivePropertyToAttributes(response[2].category.products)
                    };

                    store.dispatch(initialize(action.payload));
                    store.dispatch(setProducts(action.payload));
                    next(action);
                })
                .catch(() => {
                    alert('Faild To Fetch Data😕Please Check your Network Connection')
                });
            break;
        default:
            next(action);
            break;
    }
};

