import { request } from "graphql-request";
import { INITIALIZE } from "../actions";
import { API_URL } from "../../GraphQL/settings";
import { GET_CURRENCIES, GET_CATEGORIES, getCategoryByName } from "../../GraphQL/Queries";
import { addActivePropertyToAttributes } from "../../utils";

export const categoryMiddleware = (store) => (next) => (action) => {

    switch (action.type) {
        case INITIALIZE:
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

