import { gql } from "apollo-server-core";

const user = `
  _id
  name
  email
  status
`;

const userById = gql`
  query UserById($user: String!) {
    userById(id: $user) {
      ${user}
    }
  }
`;

const userMe = gql`
  query UserMe {
    userMe {
      ${user}
    }
  }
`;

const userQueue = gql`
  query UserQueue($limit: Int, $page: Int) {
    userQueue(limit: $limit, page: $page) {
      results {
        ${user}
      }
      info {
        page
        pages
        total
      }
    }
  }
`;

const paginate = gql`
  query UserPaginate(
    $page: Int, 
    $limit: Int, 
    $search: String, 
    $status: Status, 
    $startDate: DateTime, 
    $endDate: DateTime, 
  ) {
    userPaginate(
      page: $page, 
      limit: $limit, 
      search: $search, 
      status: $status, 
      startDate: $startDate, 
      endDate: $endDate, 
    ) {
      info {
        page
        pages
        total
      }
      results {
        ${user}
      }
    }
  }
`;

const userCreate = gql`
  mutation UserCreate($data: UserInputCreate!) {
    userCreate(data: $data) {
      ${user}
    }
  }
`;

const userUpdate = gql`
  mutation Mutation($data: UserInputUpdate!, $userId: String!) {
    userUpdate(data: $data, id: $userId) {
      ${user}
    }
  }
`;

const userUpdateMe = gql`
  mutation Mutation($data: UserInputUpdate!) {
    userUpdateMe(data: $data) {
      ${user}
    }
  }
`;

export default {
  userById,
  paginate,
  userCreate,
  userUpdate,
  userMe,
  userUpdateMe,
  userQueue,
};
