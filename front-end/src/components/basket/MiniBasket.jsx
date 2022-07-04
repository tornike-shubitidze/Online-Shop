import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import BasketItem from './BasketItem';
import { getTotalPrice, getProductsQuantity, makeId } from '../../utils';

class MiniBasket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        if (this.state.open && !this.ref.current.contains(event.target)) {
            this.onAfterOpen()
        }
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    onAfterOpen = () => {
        document.body.style.overflow = this.state.open ? 'unset' : 'hidden';
        this.setState({ open: !this.state.open })
    };


    render() {
        const { open } = this.state;
        let itemQuantity = getProductsQuantity(this.props.basket.products);
        const currency = this.props.currency.currencies.find(item => item.selected);

        return (
            <div ref={this.ref}>
                <button className='basket-icon' data-toggle="modal" data-target="#exampleModal"
                    onClick={() => this.onAfterOpen()}>
                    <img src={require("../../../src/imgs/basket.png")} alt="" />
                    {itemQuantity !== 0 ? <span className="badge ">{itemQuantity}</span> : ''}
                </button>

                <div className={`modal minibasket`}
                    style={{ display: open ? 'block' : 'none' }}
                    id="exampleModal"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <span><b>My Bag,</b> {itemQuantity} items</span>
                                {open ?
                                    this.props.basket.products.map(product => {
                                        return <BasketItem
                                            product={product}
                                            key={makeId()}
                                            canEdit={false}
                                            cssClass={'mini-cart-item'} />
                                    })
                                    : ''
                                }
                                <div className='basket-total' >
                                    <span className='total'>Total </span>
                                    <span><b>{currency?.symbol ?? ''} {getTotalPrice(this.props.basket.products, currency)}</b></span>
                                </div>

                                <div className='basket-buttons' >
                                    <Link to='/basket' onClick={this.onAfterOpen}>
                                        <button > VIEW BAG</button>
                                    </Link>
                                    <a href='/' onClick={this.onAfterOpen}>
                                        <button>CHECK OUT</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-backdrop" onClick={() => this.onAfterOpen()}
                    style={{ display: open ? 'block' : 'none' }}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
        currency: state.currency
    };
};

export default connect(mapStateToProps)(MiniBasket);