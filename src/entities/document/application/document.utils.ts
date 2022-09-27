import { Sanitize } from "@core/infrastructure/utils";

type SanitizeDocument = {
  name: string;
};

const sanitize = ({ name }: SanitizeDocument) => {
  const normalizedName = Sanitize.accents(Sanitize.clean(name));

  return {
    normalizedName,
  };
};

export default {
  sanitize,
};
