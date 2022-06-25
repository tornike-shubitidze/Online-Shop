import React, { Component } from 'react';
import { connect } from "react-redux";
import { setCategory } from '../../redux/actions';
import { Link } from "react-router-dom";

class Category extends Component {

    render() {
        const { initialized, categories } = this.props.category;

        return (
            <div className="category">
                {initialized ?
                    categories.map((x, i) =>
                        <Link to={`/${x.name}`} key={i} className={x.selected ? 'category-active' : ''}>
                            <span onClick={() => this.props.setCategory(x.name)}>
                                {x.name.toUpperCase()}
                            </span>
                        </Link>)
                    : ''
                }
            </div>
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
        setCategory
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Category);

