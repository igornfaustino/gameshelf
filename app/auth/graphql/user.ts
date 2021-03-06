import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      ... on Authorized {
        token
      }
      ... on Unauthorized {
        reason
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on Authorized {
        token
      }
      ... on Unauthorized {
        reason
      }
    }
  }
`;
