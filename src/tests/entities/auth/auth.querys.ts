import { gql } from "apollo-server-core";

const userLogin = gql`
  mutation userLogin($password: String!, $userName: String!) {
    userLogin(password: $password, userName: $userName) {
      token
    }
  }
`;

export default { userLogin };
