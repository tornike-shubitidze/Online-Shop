import React, { Component } from 'react';
import Currency from './Currency';
import Category from './Category';
class Header extends Component {

    render() {
        return (
            <>
                <div className="header">
                    <Category />
                    <img src={require("../../../src/imgs/logo.png")} alt="" />
                    <Currency />
                </div>
            </>
        );
    }
}

export default Header;

