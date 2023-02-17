import { gql } from "apollo-server-core";

const paginate = gql`
  query NotificationPaginate($page: Int, $limit: Int) {
    notificationPaginate(page: $page, limit: $limit) {
      results {
        createdAt
        updatedAt
        _id
        status
        type
        owner
        from
        leyend
        message
        idReference
      }
      info {
        page
        pages
        total
      }
    }
  }
`;

export default { paginate };
