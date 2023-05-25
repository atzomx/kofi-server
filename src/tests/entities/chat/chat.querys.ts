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
        participants
        lastMessage {
          message
        }
        destinatary {
          name
        }
      }
    }
  }
`;

export default { paginate };
