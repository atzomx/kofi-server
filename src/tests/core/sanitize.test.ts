import { Sanitizer } from "@core/infrastructure/utils/sanitize.utils";

describe("Sanitize utils", () => {
  it("Should clean a test of accents", () => {
    const test = "áÁéÉíÍóÓúÚ";
    const cleaned = new Sanitizer(test).accents().toString();
    expect(cleaned).toBe("aAeEiIoOuU");
  });

  it("Should clean spaces after and before", () => {
    const test = " hello ";
    const cleaned = new Sanitizer(test).clean().toString();
    expect(cleaned).toBe("hello");
  });
});
