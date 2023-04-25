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

const subscription = gql`
  subscription Subscription {
    notificationNew {
      _id
      status
      type
      owner
      from
      message
      idReference
    }
  }
`;

export default { paginate, subscription };
