import { describe, it as test } from "node:test";
import { deepStrictEqual } from "node:assert";
import { HAIR_QUANTITIES } from "./hair-quantity";

describe("hair quantities", () => {
  test("crochet needs four packs, five for extra fullness", () => {
    deepStrictEqual(HAIR_QUANTITIES.crochet, { standard: 4, extra: 5 });
  });
  test("bundles need three or four", () => {
    deepStrictEqual(HAIR_QUANTITIES.bundles, { standard: 3, extra: 4 });
  });
});