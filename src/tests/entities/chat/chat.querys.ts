import { gql } from "apollo-server-core";

const paginate = gql`
  query Query($page: Int, $limit: Int) {
    chatPaginate(page: $page, limit: $limit) {
      info {
        page
        pages
        total
      }
      results {
        createdAt
        updatedAt
        _id
        participants {
          createdAt
          updatedAt
          _id
          name
          userName
          email
          birthday
          description
          interest
          personality
          maritalStatus
          lookingFor
          employer
          pets
          sexualOrientation
          location
          status
          degree
          religion
          nacionality
        }
      }
    }
  }
`;

export default { paginate };
