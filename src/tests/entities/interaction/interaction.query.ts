import { gql } from "apollo-server-core";

const interaction = `
    createdAt
    updatedAt
    _id
    userFrom
    userTo
    type
`;
const simpleInteraction = `
    createdAt
    updatedAt
    _id
    userFrom
    userTo
    type 
`;

const interactionById = gql`
  query InteractionById($interactionByIdId: String!) {
    interactionById(id: $interactionByIdId) {
      ${simpleInteraction}
    }
  }
`;

const interactionCreate = gql`
  mutation InteractionCreate($data: InteractionInputCreate!) {
    interactionCreate(data: $data) {
    ${interaction}
    }
  }
`;

const interactionUpdate = gql`
  mutation InteractionUpdate(
    $data: InteractionInputUpdate!
    $interactionUpdateId: String!
  ) {
    interactionUpdate(data: $data, id: $interactionUpdateId) {
      ${simpleInteraction}
    }
  }
`;

const interactionPaginate = gql`
  query InteractionPaginate($page: Int, $limit: Int, $type: InteractionTypes) {
    interactionPaginate(page: $page, limit: $limit, type: $type) {
      info {
        page
        pages
        total
      }
      results {
        ${simpleInteraction}
      }
    }
  }
`;

export default {
  interactionById,
  interactionCreate,
  interactionUpdate,
  interactionPaginate,
};
