import React, { Component } from 'react';

class ProductAttribute extends Component {

    constructor(props) {
        super(props);

        this.state = {
            attribute: this.props.attribute
        }
    }

    onAttributeChange = (value) => {
        if (this.props.canEdit === true) {
            const items = this.state.attribute.items.map(element => {
                element.active = element.value === value;
                return element;
            });

            const attribute = this.state.attribute;
            attribute.items = items;

            this.setState({
                attribute
            });

            this.props.onAttributeChange(attribute);
        }
    }

    render() {
        const { attribute } = this.state;
        return (
            <div >
                <b>{attribute.name}</b>
                <br />
                <div className="attribute">
                    {attribute.items.map((item, i) => {
                        return <div
                            key={i}
                            style={{
                                backgroundColor: `${attribute.type === 'text' ? `` : `${item.value}`}`, cursor: `${this.props.canEdit ? 'pointer' : ``}`,
                                width: `${attribute.type === 'text' ? '' : '25px'}`,
                                height: `${attribute.type === 'text' ? '' : '25px'}`
                            }}
                            onClick={() => this.onAttributeChange(item.value)}
                            className={'attribute-box' + (item.active ? " active" : "")}>
                            {attribute.type === 'text' ? <span>{item.value}</span> : ''}
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default ProductAttribute;