const DEFAULT_LENGTH = 20;

const getMessage = (message: string, length = DEFAULT_LENGTH) =>
  message.length > length
    ? message.substring(0, length).trim().concat("...")
    : message;

export default { getMessage };
