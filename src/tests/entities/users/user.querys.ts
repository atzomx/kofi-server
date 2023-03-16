import { gql } from "apollo-server-core";

const media = `
  _id
  type
  url
`;

const user = `
  _id
  name
  email
  status
  preferences {
    personality
    maritalStatus
    lookingFor
    pets
    sexualPreference
    degree
    religion
    ageRange {
      min
      max
    }
  }
  information {
    medias {
      ${media}
    }
    birthday
    description
    interest
    personality
    maritalStatus
    lookingFor
    employer
    pets
    sexualOrientation
    location {
      type
      coordinates
    }
    degree
    religion
    nacionality
  }
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
  mutation UserCreate($data: UserCreateInput!) {
    userCreate(data: $data) {
      ${user}
    }
  }
`;

const userUpdate = gql`
  mutation Mutation($data: UserUpdateInput!, $userId: String!) {
    userUpdate(data: $data, id: $userId) {
      ${user}
    }
  }
`;

const userUpdateMe = gql`
  mutation Mutation($data: UserUpdateInput!) {
    userUpdateMe(data: $data) {
      ${user}
    }
  }
`;

const userMediaCreate = gql`
  mutation UserMediaCreate($data: MediaCreateInput!) {
    userMediaCreate(data: $data) {
      ${media}
    }
  }
`;

const userMediaDelete = gql`
  mutation UserMediaDelete($id: ObjectId!) {
    userMediaDelete(id: $id) {
      ${media}
    }
  }
`;

const userMediaOrder = gql`
  mutation UserMediaOrder($data: UserMediaOrderInput!) {
    userMediaOrder(data: $data) {
      ${media}
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
  userMediaCreate,
  userMediaDelete,
  userMediaOrder,
};
