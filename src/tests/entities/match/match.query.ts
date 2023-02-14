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

const matchById = gql`
  query MatchById($matchByIdId: String!) {
    matchById(id: $matchByIdId) {
       ${match}
    }
  }
`;

const matchUpdate = gql`
mutation MatchUpdate($data: MatchInputUpdate!, $matchUpdateId: String!) {
  matchUpdate(data: $data, id: $matchUpdateId) {
   ${match}
  }
}
`;
const matchPagination = gql`
query MatchPaginate($page: Int, $limit: Int, $status: MatchStatus) {
  matchPaginate(page: $page, limit: $limit, status: $status) {
    info {
      page
      pages
      total
    }
    results {
    ${match}
    }
  }
}
`;
export default {
  matchById,
  matchUpdate,
  matchPagination,
};
