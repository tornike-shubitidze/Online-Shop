import React, { Component } from 'react';
import { onIncreaseQuantity, onDecreaseQuantity } from '../../redux/actions';
import { connect } from "react-redux";
import ProductAttribute from '../ProductAttribute';

class BasketItem extends Component {

    state = {
        counter: 0
    }

    increaseCounter = () => {
        let counter = this.state.counter;
        let length = this.props.product.gallery.length;
        if (length > counter + 1) {
            this.setState({ counter: counter + 1 })
        }
    }

    decreaseCounter = () => {
        let counter = this.state.counter;
        if (counter > 0) {
            this.setState({ counter: counter - 1 })
        }
    }

    getAmount = ({ prices }) => {
        const currentCurrency = this.props.currency.currencies.find(x => x.selected);
        const price = prices.find(x => x.currency.label === currentCurrency.label);

        return `${price.currency.symbol} ${price.amount}`;
    }


    render() {
        let { product, cssClass, canEdit } = this.props;
        const { counter } = this.state;

        return (
            <>
                <div className={cssClass}>
                    <div className='item-info'>
                        <h2>{product.brand}</h2>
                        <h1>{product.name}</h1>
                        <span className='price'>{this.getAmount(product)}</span>
                        <br />
                        <div>
                            {product.attributes.map(attribute => {
                                return <ProductAttribute
                                    key={attribute.id}
                                    attribute={attribute}
                                    canEdit={canEdit}
                                    cssClass={cssClass}
                                />
                            })}
                        </div>
                    </div>
                    <div className="item-amount">
                        <div className="change-amount">
                            <div className="plus-minus-square" onClick={() => this.props.onIncreaseQuantity(product)}>+</div>
                            <div className="quantity-square" >{product.quantity}</div>
                            <div className="plus-minus-square" onClick={() => this.props.onDecreaseQuantity(product)}>-</div>
                        </div>
                        <div className="cart-img">
                            <img src={product.gallery[counter]} alt="" />
                        </div>
                        {product.gallery.length > 1 ?
                            <div className='arrows' >
                                <span className="arrow" onClick={this.decreaseCounter}>&#8249;</span>
                                <span className="arrow" onClick={this.increaseCounter}>&#8250;</span>
                            </div> : ""}
                    </div>
                </div>
                {cssClass === 'mini-cart-item' ? '' : <hr />}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
        currency: state.currency
    };
};

const mapDispatchToProps = () => {
    return {
        onIncreaseQuantity,
        onDecreaseQuantity
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(BasketItem);