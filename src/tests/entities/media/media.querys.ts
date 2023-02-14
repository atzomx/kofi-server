import { gql } from "apollo-server-core";

const media = `
    _id
    type
    url
`;

const mediaById = gql`
  query MediaById($media: String!) {
    mediaById(id: $media) {
      ${media}
    }
  }
`;

const paginate = gql`
  query MediaPaginate(
    $page: Int, 
    $limit: Int, 
    $search: String,
    $startDate: DateTime, 
    $endDate: DateTime, 
  ) {
    mediaPaginate(
      page: $page, 
      limit: $limit, 
      search: $search,
      startDate: $startDate, 
      endDate: $endDate, 
    ) {
      info {
        page
        pages
        total
      }
      results {
        ${media}
      }
    }
  }
`;

const mediaCreate = gql`
  mutation MediaCreate($data: MediaInputCreate!) {
    mediaCreate(data: $data) {
      ${media}
    }
  }
`;

const mediaDelete = gql`
  mutation MediaDelete($mediaId: String!) {
    mediaDelete(id: $mediaId) {
      ${media}
    }
  }
`;

export default { mediaById, paginate, mediaCreate, mediaDelete };
