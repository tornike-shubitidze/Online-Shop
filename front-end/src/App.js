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
          <Route exact path="/" component={Products} />
          <Route exact path="/details/:id" component={ProductDetails} />
          <Route exact path="/basket" component={Basket} />
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
