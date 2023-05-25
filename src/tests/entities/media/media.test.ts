import "reflect-metadata";
import { Types } from "mongoose";
import request from "supertest-graphql";
import { IPagination } from "@core/domain/interfaces";
import testUtils from "@core/infrastructure/utils/test.utils";
import { Media } from "@entities/media";
import MediaFaker from "@test/fakers/media/media.faker";
import { app, authorization, entities } from "@test/setup";
import mediaQuerys from "./media.querys";

const keysRequired = ["_id", "type", "url"];

describe("Media Test", () => {
  it("Should return a media", async () => {
    const media = testUtils.getOneFromArray(entities.medias);
    const mediaId = media._id.toString();

    const result = await request<{ mediaById: Media }>(app)
      .query(mediaQuerys.mediaById)
      .variables({ media: mediaId })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("mediaById");
    const data = result.data.mediaById;

    keysRequired.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Shouldn't return a media with unexist id", async () => {
    const media = new Types.ObjectId().toString();
    const result = await request<{ mediaById: Media }>(app)
      .query(mediaQuerys.mediaById)
      .variables({ media })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("Media not found");
  });

  it("Should paginate medias", async () => {
    const currentDate = new Date();
    const endDate = new Date();
    const startDate = new Date();
    endDate.setDate(currentDate.getDate() + 10);
    startDate.setDate(currentDate.getDate() - 10);

    const variables = {
      page: 1,
      limit: 5,
      endDate,
      startDate,
      search: "a",
    };

    const result = await request<{ mediaPaginate: IPagination<Media> }>(app)
      .query(mediaQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("mediaPaginate");
    const data = result.data["mediaPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();
    results.forEach((media) => {
      keysRequired.forEach((key) => {
        expect(media).toHaveProperty(key);
      });
    });
  });

  it("Should paginate medias without params", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ mediaPaginate: IPagination<Media> }>(app)
      .query(mediaQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("mediaPaginate");
    const data = result.data["mediaPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();
    results.forEach((media) => {
      keysRequired.forEach((key) => {
        expect(media).toHaveProperty(key);
      });
    });
  });

  it("Shouldn't create a media with bad arguments", async () => {
    const newMedia = MediaFaker.get();
    newMedia.url = "badUrlMedia";
    const { errors } = await request<{ mediaCreate: Media }>(app)
      .query(mediaQuerys.mediaCreate)
      .variables({ data: newMedia });

    expect(errors).toBeTruthy();
  });

  it("Should create a media", async () => {
    const newMedia = MediaFaker.get();

    const result = await request<{ mediaCreate: Media }>(app)
      .query(mediaQuerys.mediaCreate)
      .variables({ data: newMedia });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("mediaCreate");
    const data = result.data["mediaCreate"] as Media;
    keysRequired.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should delete a media", async () => {
    const media = testUtils.getOneFromArray(entities.medias);
    const mediaId = media._id.toString();

    const result = await request<{ mediaDelete: Media }>(app)
      .query(mediaQuerys.mediaDelete)
      .variables({ mediaId })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
  });
});
