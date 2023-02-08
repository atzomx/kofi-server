import { gql } from "apollo-server-core";

const match = `
    createdAt
    updatedAt
    _id
    participants {
      _id
    }
    status
`;
const simpleInteraction = `
    createdAt
    updatedAt
    _id
    userFrom
    userTo
    type 
`;

const matchById = gql`
  query MatchById($matchByIdId: String!) {
    matchById(id: $matchByIdId) {
       ${match}
    }
  }
`;

const interactionCreate = gql`
  mutation InteractionCreate($data: InteractionInputCreate!) {
    interactionCreate(data: $data) {
    ${match}
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
  matchById,
  interactionCreate,
  interactionUpdate,
  interactionPaginate,
};
