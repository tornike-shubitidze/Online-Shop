import { request } from "graphql-request";
import { API_URL } from "../../GraphQL/settings";
import { getCategoryByName } from "../../GraphQL/Queries";
import { addActivePropertyToAttributes } from "../../utils";

export const productsMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case 'categories/setCategory':
            request(API_URL, getCategoryByName(action.payload))
                .then((res) => {
                    let selectedProducts = res.category.products;
                    const categoryName = action.payload;
                    action.payload = {
                        products: addActivePropertyToAttributes(selectedProducts),
                        categoryName: categoryName
                    };
                    next(action);
                });
            break;
        default:
            next(action);
            break;
    }
};