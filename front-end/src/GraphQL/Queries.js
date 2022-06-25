import { gql } from "graphql-request";

export const GET_DATA = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CATEGORIES = gql`
{
  categories{
  name   
  }
}
`;

export function getProductById(id) {
  return gql`
  {
    product(id: "${id}") {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;
}


export function getCategoryByName(name) {
  return gql`
  {
    category(input: {title:"${name}"}){
      name
      products {
        id
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }      
    }   
  }`
}
