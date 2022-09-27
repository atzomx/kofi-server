import { Paginate } from "@core/infrastructure/utils";
import {
  AnyKeys,
  AnyObject,
  FilterQuery,
  HydratedDocument,
  Model,
  Types,
} from "mongoose";

const DEFAULT_PAGINATION = 15;

class Repository<T> {
  public instance: typeof Model;

  constructor(instance: typeof Model) {
    this.instance = instance;
  }

  create(entity: T): Promise<HydratedDocument<T, T, T>> {
    return this.instance.create<T>(entity);
  }

  find(filter: FilterQuery<T>) {
    return this.instance.find<T>(filter);
  }

  findOne(filter?: FilterQuery<T>) {
    return this.instance.findOne<T>(filter);
  }

  findById(id: string | Types.ObjectId) {
    return this.instance.findById<T>(id);
  }

  findByIdAndUpdate(
    id: string | Types.ObjectId,
    entity: AnyObject | AnyKeys<T>,
  ) {
    return this.instance.findByIdAndUpdate<T>(id, entity, {
      runValidators: true,
      new: true,
    });
  }

  paginate(
    query: FilterQuery<T>,
    {
      page = 1,
      limit = DEFAULT_PAGINATION,
    }: {
      page?: number;
      limit?: number;
    },
  ) {
    const skip = Paginate.getSkip({ page, limit });
    const documents = this.instance
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean<T[]>();
    const total = this.instance.find().countDocuments();

    return {
      getResults: () => documents,
      getTotal: () => total,
    };
  }

  deleteMany() {
    return this.instance.deleteMany();
  }

  insertMany(documents: T[]): Promise<T[]> {
    return this.instance.insertMany(documents);
  }

  custom() {
    return this.instance;
  }
}

export default Repository;
