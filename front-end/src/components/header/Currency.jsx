import React, { Component } from 'react';
import MiniBasket from '../basket/MiniBasket';
import { connect } from "react-redux";
import { setCategory, setCurrency } from '../../redux/actions';

class Currency extends Component {

    state = {
        currentValue: this.props.currency.currencies,
        // currencies: this.props.currency.currencies,
        currencies: [
            { label: "USD", symbol: "$" },
            { label: "GBP", symbol: "£" },
            { label: "AUD", symbol: "A$" },
            { label: "JPY", symbol: "¥" },
            { label: "RUB", symbol: "₽" }
        ],
        currentCurrency: "$",
        showHide: false
    }

    onCurrancyChange(value) {
        this.setState({ currentCurrency: value, showHide: !this.state.showHide })
    }

    showHideCurrencyList() {
        this.setState({ showHide: !this.state.showHide })
    }


    componentDidMount() {
        // const currencies = this.props.currency.currencies;
        // let currentValue = currencies.find(x => x.selected);
        // this.setState({ currentValue }) 
        // console.log("this.state.currentValue:", this.state.currentValue);
        // console.log("currentValue:", currentValue);
    }

    render() {
        // const currencies = this.props.currency.currencies;
        // let selectedCurrency = currencies.find(x => x.selected);
        // console.log(this.state.currentValue);
        console.log(this.props.currency.currencies);
        console.log(this.state);


        return (
            <div className="cart-currency">

                <div className="dropdown">
                    <button onClick={() => this.showHideCurrencyList()} className="dropbtn">{this.state.currentCurrency}&nbsp;
                        <div className={`caret${this.state.showHide ? ' down' : ''}`}>^</div>
                    </button>
                    <div className={`dropdown-content ${this.state.showHide ? 'show' : ''}`} >
                        {this.state.currencies.map((c, i) => <span key={i} onClick={() => this.onCurrancyChange(c.symbol)}>{c.symbol + ' '}{c.label}</span>)}
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