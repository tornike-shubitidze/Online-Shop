import { request } from "graphql-request";
import { INITIALIZE } from "../actions";
import { API_URL } from "../../GraphQL/settings";
import { GET_DATA, GET_CURRENCIES } from "../../GraphQL/Queries";
import { addActivePropertyToAttributes } from "../../utils";

export const categoryMiddleware = (store) => (next) => (action) => {
    const categoryCall = request(API_URL, GET_DATA);
    const currencyCall = request(API_URL, GET_CURRENCIES);
    switch (action.type) {
        case INITIALIZE:
            Promise.all([categoryCall, currencyCall])
                .then((response) => {
                    action.payload = {
                        categories: response[0].categories.map((category, i) => { return { name: category.name, selected: i === 0 } }),
                        currencies: response[1].currencies.map((x, i) => { return { label: x.label, symbol: x.symbol, selected: i === 0 } }),
                        products: addActivePropertyToAttributes(response[0].categories[0].products)
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

