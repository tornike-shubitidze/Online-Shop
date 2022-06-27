import React, { Component } from 'react';
import MiniBasket from '../basket/MiniBasket';
import { connect } from "react-redux";
import { setCategory, setCurrency } from '../../redux/actions';

class Currency extends Component {

    state = {
        currentCurrency: "$",
        showHide: false
    }

    onCurrancyChange(value) {
        this.setState({ currentCurrency: value, showHide: !this.state.showHide })
        this.props.setCurrency(value)
    }

    showHideCurrencyList() {
        this.setState({ showHide: !this.state.showHide })
    }

    render() {
        const { currencies } = this.props.currency;

        return (

            <div className="cart-currency">
                <div className="dropdown">
                    <button onClick={() => this.showHideCurrencyList()} className="dropbtn">{this.state.currentCurrency}&nbsp;
                        <div className={`caret${this.state.showHide ? ' down' : ''}`}>^</div>
                    </button>
                    <div className={`dropdown-content ${this.state.showHide ? 'show' : ''}`} >
                        {currencies.map((c, i) => <span key={i} onClick={() => this.onCurrancyChange(c.symbol)}>{c.symbol + ' '}{c.label}</span>)}
                    </div>
                </div>
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