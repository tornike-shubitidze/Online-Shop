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
          <Route exact path="/" render={() => <Products />} />
          <Route exact path="/all" render={() => <Products />} />
          <Route exact path="/clothes" render={() => <Products />} />
          <Route exact path="/tech" render={() => <Products />} />
          <Route exact path="/details/:id" render={() => <ProductDetails />} />
          <Route exact path="/basket" render={() => <Basket />} />
          <Route exact path="*" render={() => ErrorPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;