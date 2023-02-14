import "reflect-metadata";
import MediaFaker from "./media.faker";

const keysRequired = ["type", "url"];

describe("Media faker", () => {
  it("Should return a meida random", () => {
    const media = MediaFaker.get();
    [...keysRequired].forEach((key) => {
      expect(media).toHaveProperty(key);
    });

    expect(media).toHaveProperty("type");
    expect(media).toHaveProperty("url");
  });
});
