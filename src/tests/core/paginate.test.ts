import { getSkip } from "@core/infrastructure/utils/paginate.utils";

describe("Paginate utils", () => {
  it("Should return a valid skip", () => {
    const skip = getSkip({ page: 5, limit: 10 });
    expect(skip).toBe(40);
  });

  it("Should return a 0 skip", () => {
    const skip = getSkip({ page: 0, limit: 10 });
    expect(skip).toBe(0);
  });

  it("Should return a 0 skip with negative page", () => {
    const skip = getSkip({ page: -1, limit: 10 });
    expect(skip).toBe(0);
  });

  it("Should return a 0 skip with negative limit", () => {
    const skip = getSkip({ page: 5, limit: -10 });
    expect(skip).toBe(0);
  });

  it("Should return a 0 skip with negative limit", () => {
    const skip = getSkip({});
    expect(skip).toBe(0);
  });
});
