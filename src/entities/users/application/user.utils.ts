/* eslint-disable indent */
import { Sanitizer } from "@core/infrastructure/utils";
import { AnyObject, PipelineStage } from "mongoose";
import { IUserStatus } from "../domain/user.enums";

type TSeaching = {
  search?: string;
  endDate?: Date;
  startDate?: Date;
  status?: IUserStatus;
};

const searchingQuery = ({
  search = "",
  status,
  startDate,
  endDate = new Date(),
}: TSeaching) => {
  const cleanSearch = new Sanitizer(search).clean().accents().toString();
  const textQuery = cleanSearch
    ? {
        $or: [
          { email: { $regex: cleanSearch, $options: "i" } },
          { name: { $regex: cleanSearch, $options: "i" } },
        ],
      }
    : null;

  const dateQuery = startDate
    ? { createdAt: { $gte: startDate, $lt: endDate } }
    : null;

  return {
    ...(status ? { status } : {}),
    ...(textQuery ?? {}),
    ...(dateQuery ?? {}),
  };
};

type TPointQuery = {
  coordinates?: [number, number];
  maxDistance?: number;
  minDistance?: number;
  query: AnyObject;
};

const pointQuery = ({
  coordinates,
  maxDistance,
  minDistance,
  query,
}: TPointQuery): PipelineStage.GeoNear => {
  const pointQuery: PipelineStage.GeoNear = {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: coordinates,
      },
      distanceField: "distance",
      maxDistance: maxDistance,
      minDistance: minDistance,
      spherical: true,
      distanceMultiplier: 0.001,
      key: "information.location",
      query,
    },
  };
  return pointQuery;
};

export default {
  searchingQuery,
  pointQuery,
};
