import { gql } from "apollo-server-core";

const verification = `
   createdAt
    updatedAt
    _id
    media
    userId
    detail
    status
    pose
`;

const verificationById = gql`
  query VerificationById($verificationById: String!) {
  verificationById(id: $verificationById) {
    ${verification}
  }
}
`;

const verificationPaginate = gql`
  query VerificationPaginate(
    $page: Int
    $limit: Int 
    $pose: Poses
    $status: StatusVerification
    $createdAt: DateTime
    $userId: String
  ) {
    verificationPaginate(
      page: $page
      limit: $limit 
      pose: $pose
      status: $status
      createdAt: $createdAt
      userId: $userId
    ) {
      info {
        page
        pages
        total
      }
      results {
       ${verification}
      }
    }
  }
`;
const verificationCreate = gql`
  mutation VerificationCreate($data: VerificationInputCreate!) {
    verificationCreate(data: $data) {
     ${verification}
    }
  }
`;

const verificationUpdate = gql`
  mutation VerificationUpdate(
    $data: VerificationInputUpdate!
    $verificationUpdateId: String!
  ) {
    verificationUpdate(data: $data, id: $verificationUpdateId) {
      ${verification}
    }
  }
`;

export default {
  verificationById,
  verificationPaginate,
  verificationCreate,
  verificationUpdate,
};
