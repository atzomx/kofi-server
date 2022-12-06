import { gql } from "apollo-server-core";

const create = gql`
  mutation MessageCreate($data: MessageInputCreate!) {
    messageCreate(data: $data) {
      createdAt
      updatedAt
      _id
      chat
      owner
      message
      status
      media
    }
  }
`;

const paginate = gql`
  query MessagePaginate($page: Int, $limit: Int, $chat: String) {
    messagePaginate(page: $page, limit: $limit, chat: $chat) {
      info {
        page
        pages
        total
      }
      results {
        createdAt
        updatedAt
        _id
        chat
        owner
        message
        status
        media
      }
    }
  }
`;

const subscription = gql`
  subscription Subscription($chat: String!) {
    messageNew(chat: $chat) {
      createdAt
      updatedAt
      _id
      chat
      owner
      message
      status
      media
    }
  }
`;

export default { create, paginate, subscription };
