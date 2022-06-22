import React, { Component } from 'react';
import Currency from './Currency';
import Category from './Category';
import { connect } from "react-redux";
import { loadCategories } from '../../redux/actions'

class Header extends Component {

    render() {
        return (
            <>
                <div className="header">
                    <Category />
                    <img src={require("../../../src/imgs/logo.png")} />
                    <Currency />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    };
};

const mapDispatchToProps = () => {
    return {
        loadCategories
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Header);

