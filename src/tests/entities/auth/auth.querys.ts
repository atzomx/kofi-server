import { gql } from "apollo-server-core";

const userLogin = gql`
  mutation userLogin($password: String!, $user: String!) {
    userLogin(password: $password, user: $user) {
      token
    }
  }
`;

export default { userLogin };
