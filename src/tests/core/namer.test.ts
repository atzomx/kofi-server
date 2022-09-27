import Namer from "@core/infrastructure/utils/namer.utils";

describe("Namer utils", () => {
  it("Should return name of methods based in a initial name", () => {
    const result = Namer.get("Base");
    expect(result.create).toBe("BaseCreate");
    expect(result.find).toBe("BaseById");
    expect(result.update).toBe("BaseUpdate");
    expect(result.paginate).toBe("BasePaginate");
  });
});
