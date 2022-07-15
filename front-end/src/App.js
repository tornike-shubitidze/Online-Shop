import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Layout from "./components/Layout";
import ProductDetails from "./pages/ProductDetails";
import Basket from "./pages/Basket";
import Products from "./pages/Products";
import ErrorPage from "./components/ErrorPage";

class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" render={(props) => <Products {...props} />} />
          <Route exact path="/basket" render={(props) => <Basket {...props} />} />
          <Route exact path="/details/:id" render={(props) => <ProductDetails {...props} />} />
          <Route exact path="/:id" render={(props) => <Products {...props} />} />
          <Route exact path="*" render={(props) => <ErrorPage {...props} />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;