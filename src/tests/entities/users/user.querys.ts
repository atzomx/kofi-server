import { gql } from "apollo-server-core";

const user = `
    _id
    firstName
    lastName
    secondLastName
    normalizedFullName
    image
    curp
    gender
    birthday
    phoneNumber
    email
    userName
    status
`;

const userById = gql`
  query UserById($user: String!) {
    userById(id: $user) {
      ${user}
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
    $gender: Gender
  ) {
    userPaginate(
      page: $page, 
      limit: $limit, 
      search: $search, 
      status: $status, 
      startDate: $startDate, 
      endDate: $endDate, 
      gender: $gender
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

export default { userById, paginate, userCreate, userUpdate };
