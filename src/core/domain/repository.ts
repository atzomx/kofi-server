import { Paginate } from "@core/infrastructure/utils";
import {
  AnyKeys,
  AnyObject,
  FilterQuery,
  HydratedDocument,
  Model,
  PopulateOptions,
  SortOrder,
  Types,
} from "mongoose";

const DEFAULT_PAGINATION = 15;

class Repository<T> {
  public instance: typeof Model;

  constructor(instance: typeof Model) {
    this.instance = instance;
  }

  async create(entity: T): Promise<T> {
    const result = await this.instance.create<T>(entity);
    return result._doc as T;
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

  async paginate(
    query: FilterQuery<T>,
    {
      page = 1,
      limit = DEFAULT_PAGINATION,
      sort,
      populate,
    }: {
      page?: number;
      limit?: number;
      sort?: string | { [key: string]: SortOrder };
      populate?: PopulateOptions;
    },
  ) {
    const skip = Paginate.getSkip({ page, limit });
    const documentsPromise = this.instance
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate(populate)
      .lean<T[]>();
    const totalPromise = this.instance.find(query).countDocuments();
    const [results, total] = await Promise.all([
      documentsPromise,
      totalPromise,
    ]);
    const pages = Math.ceil(total / limit);
    return {
      results,
      info: {
        page,
        total,
        pages,
      },
    };
  }

  findByIdAndDelete(id: string | Types.ObjectId) {
    return this.instance.findByIdAndDelete<T>(id);
  }

  deleteMany() {
    return this.instance.deleteMany();
  }

  insertMany(
    documents: T[],
  ): Promise<Array<HydratedDocument<T, unknown, unknown> & { _doc: T }>> {
    return this.instance.insertMany(documents);
  }

  exists(filter: FilterQuery<T>) {
    return this.instance.exists(filter) as unknown as Promise<boolean>;
  }

  custom() {
    return this.instance;
  }
}

export default Repository;
