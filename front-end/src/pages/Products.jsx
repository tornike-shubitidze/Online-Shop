import React, { Component } from 'react'
import { addToBasket } from '../redux/actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Products extends Component {

    getCurrency = (product) => {
        const currentCurrency = this.props.currencies.currencies.find((x) => x.selected).label;
        const price = product.prices.find(item => item.currency.label === currentCurrency);

        return <b>
            {price.currency.symbol + ' '}
            {price.amount}
        </b>
    }

    getCategoryName = () => this.props.category.categories.find(item => item.selected)?.name.toUpperCase() ?? '';

    getHtmlDetails = (product) => {
        return <>
            {!product.inStock ?
                <div className="out-of-stock">
                    <span>OUT OF STOCK</span>
                </div>
                : ''}
            <img src={product.gallery[0]} />
            <div className='caption'>
                <p>
                    {product.name}
                    <span style={{ display: 'block', margin: '5px 0px' }}>{this.getCurrency(product)}</span>
                </p>
            </div>
        </>
    }

    render() {
        return (
            <>
                <h1 className="category-title">{this.getCategoryName()}</h1>
                <div className="products">
                    {this.props.products.products.map((product) => {
                        return <div className="product" key={product.id}>
                            {product.inStock ?
                                <div className='thumbnail'>
                                    <Link
                                        to={`/details/${product.id}`}>
                                        {this.getHtmlDetails(product)}
                                    </Link>
                                    <button className='add-product-btn' onClick={() => this.props.addToBasket(product)} >
                                        <img src={require("../imgs/basket-hover.png")} />
                                    </button>
                                </div> :
                                this.getHtmlDetails(product)}
                        </div>
                    })}
                </div>
            </>);
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category,
        products: state.products,
        currencies: state.currency,
        basket: state.basket
    };
};

const mapDispatchToProps = () => {
    return {
        addToBasket
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Products);

