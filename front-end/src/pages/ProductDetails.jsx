import React, { Component } from 'react';
import parse from 'html-react-parser';
import { addToBasket } from '../redux/reducers/basketReducer';
import { connect } from "react-redux";
import { API_URL } from "../GraphQL/settings";
import { getProductById } from "../GraphQL/Queries";
import { request } from "graphql-request";
import ProductAttribute from '../components/ProductAttribute';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            product: {},
            loaded: false,
            hasError: false,
            errorMessage: '',
            mainImg: ''
        }
    }

    componentDidMount() {
        request(API_URL, getProductById(this.state.id))
            .then((res) => {
                const product = res.product;
                const attributes = product.attributes;

                attributes.forEach(attribute => {
                    attribute.items.forEach((element, i) => {
                        element.active = i === 0;
                    });
                });

                this.setState({
                    product: product,
                    loaded: true,
                    mainImg: res.product.gallery[0]
                });

            }).catch(error => {
                this.setState({
                    hasError: true,
                    errorMessage: error
                });
            });
    }

    getCurrency = (product) => {
        const currentCurrency = this.props.currencies.currencies.find((x) => x.selected)?.label ?? 'USD';
        const price = product.prices.find(item => item.currency.label === currentCurrency);

        return <b>
            {price.currency.symbol}
            {price.amount}
        </b>
    }

    render() {
        const { product } = this.state;

        return (
            <>
                {this.state.loaded && !this.state.hasError ? <>
                    <div className="pdp">
                        <div className="images">
                            {product.gallery.map((imgUrl, i) =>
                                <img
                                    alt=""
                                    key={i}
                                    onClick={() => this.setState({ mainImg: imgUrl })}
                                    src={`${imgUrl}`} />
                            )}
                        </div>
                        <div className="main-image">
                            <img src={`${this.state.mainImg}`} alt="" />
                        </div>
                        <div className="product-info">
                            <h2>{product.brand}</h2>
                            <h1>{product.name}</h1>


                            <div>
                                {product.attributes.map(attribute => {
                                    return (
                                        <ProductAttribute
                                            key={attribute.id}
                                            attribute={attribute}
                                            cssClass={'attribute-box'}
                                            canEdit={true} />
                                    )
                                })}
                            </div>

                            <b>PRICE:</b>
                            <br />
                            <b>{this.getCurrency(product)}</b>
                            <br />
                            <br />
                            <button onClick={() => this.props.addToBasket(this.state.product)} disabled={!product.inStock}>ADD TO CART</button>

                            <div className='description' >{parse(product.description)}</div>
                        </div>
                    </div>
                </> : ''}
                <br />
            </>);
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currency,
    };
};

const mapDispatchToProps = () => {
    return {
        addToBasket
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductDetails);
