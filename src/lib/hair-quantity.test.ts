import { describe, expect, test } from "bun:test";
import { HAIR_QUANTITIES } from "./hair-quantity";

describe("hair quantities", () => {
  test("crochet needs four packs, five for extra fullness", () => {
    expect(HAIR_QUANTITIES.crochet).toEqual({ standard: 4, extra: 5 });
  });
  test("bundles need three or four", () => {
    expect(HAIR_QUANTITIES.bundles).toEqual({ standard: 3, extra: 4 });
  });
});