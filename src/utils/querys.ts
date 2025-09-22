import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const GET_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      capital
      continent {
        name
        code
      }
      currencies
      languages {
        name
      }
      native
    }
  }
`;

export const GET_COUNTRIES_BY_CODE = gql`
  query Countries($code: String) {
    countries(filter: { continent: { eq: $code } }) {
      code
      name
      emoji
    }
  }
`;
