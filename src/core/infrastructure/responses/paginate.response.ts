import { Max, Min } from "class-validator";
import { ArgsType, ClassType, Field, Int, ObjectType } from "type-graphql";

@ArgsType()
export class PaginateArgs {
  @Field(() => Int, { description: "Selected page." })
  @Min(0)
  public page = 1;

  @Field(() => Int, { description: "Records limit per page." })
  @Min(5)
  @Max(50)
  public limit = 10;
}

@ObjectType()
export class PaginateInfo {
  @Field(() => Int, { description: "Current page." })
  public page!: number;

  @Field(() => Int, { description: "Number of pages." })
  public pages!: number;

  @Field(() => Int, { description: "Total number of records on page." })
  public total!: number;
}

export function PaginateResponse<TModel>(TModelClass: ClassType<TModel>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => PaginateInfo, { description: "Pagination information." })
    public info!: PaginateInfo;

    @Field(() => [TModelClass], { description: "Requested information." })
    public results!: TModel[];
  }
  return PaginatedResponseClass;
}

export default PaginateResponse;
