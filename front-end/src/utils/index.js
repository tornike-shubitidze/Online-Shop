export function shallowEqual(object1, object2) {
    let newObj1 = { ...object1 };
    let newObj2 = { ...object2 };

    delete newObj1['quantity'];
    delete newObj2['quantity'];

    return JSON.stringify(newObj1) === JSON.stringify(newObj2);
}


export function addActivePropertyToAttributes(items) {
    const products = [...items];
    products.forEach((product) => {
        const attributes = product.attributes;
        attributes.forEach(attribute => {
            attribute.items.forEach((element, i) => {
                element.active = i === 0;
            });
        });
    });
    return products;
}


export function getTotalPrice(products, currency) {
    let totalPrice = 0;

    [...products].forEach(item => {
        const amount = item.prices.find(x => x.currency.label === currency.label).amount;
        totalPrice += (item.quantity * amount);
    });

    return totalPrice.toFixed(2);
}


export function getProductsQuantity(products) {
    let quantity = 0;

    [...products].forEach(item => {
        quantity += item.quantity;
    });

    return quantity;
}

export function makeId() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}