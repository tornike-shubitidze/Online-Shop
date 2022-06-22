import React, { Component } from 'react';
import MiniBasket from '../basket/MiniBasket';
import { connect } from "react-redux";
import { setCategory, setCurrency } from '../../redux/actions';

class Currency extends Component {

    render() {
        const currencies = this.props.currency?.currencies;

        return (
            <div className="cart-currency">
                <select className="currency" type="dropdown" onChange={(e) => this.props.setCurrency(e.target.value)} >
                    {currencies.map((c, i) => <option value={`${c.label}`} key={i}>{c.symbol + ' '}{c.label}</option>)}
                </select>
                <MiniBasket />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency
    };
};

const mapDispatchToProps = () => {
    return {
        setCategory,
        setCurrency
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Currency);