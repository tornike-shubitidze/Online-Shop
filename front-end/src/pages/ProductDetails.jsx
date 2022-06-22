import React, { Component } from 'react';
import { addToBasket } from '../redux/actions';
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

    onAttributeStateChange = (attribute) => {
        const product = this.state.product;
        const attributes = product.attributes;

        let currentAttribute = attributes.find(x => x.id === attribute.id);
        currentAttribute = attribute;

        this.setState({
            product
        })
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
                                    key={i}
                                    style={{ cursor: 'pointer', marginBottom: '15px' }}
                                    onClick={() => this.setState({ mainImg: imgUrl })}
                                    src={`${imgUrl}`} />
                            )}
                        </div>
                        <div className="main-image">
                            <img src={`${this.state.mainImg}`} />
                        </div>
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <h1>Description</h1>
                            <div className='description' dangerouslySetInnerHTML={{ __html: product.description }} />
                            <br />
                            <div>
                                {product.attributes.map(attribute => {
                                    return (
                                        <ProductAttribute
                                            key={attribute.id}
                                            attribute={attribute}
                                            cssClass={'attribute-box'}
                                            canEdit={true}
                                            onAttributeChange={(attribute) => this.onAttributeStateChange(attribute)} />
                                    )
                                })}
                            </div>
                            <br />
                            <b>PRICE:</b>
                            <br />
                            <b>{this.getCurrency(product)}</b>
                            <br />
                            <br />
                            <button onClick={() => this.props.addToBasket(this.state.product)}>ADD TO CART</button>
                            <br />
                            <br />
                            <p>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail
                                dresses and party dresses from all your favorite brands.</p>
                        </div>
                    </div>
                </> : ''}
                <br />
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

export default connect(mapStateToProps, mapDispatchToProps())(ProductDetails);
