import { toBeDeepCloseTo, toMatchCloseTo } from "jest-matcher-deep-close-to";

import { range } from "./utils";

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe("utils", function () {
    describe("#range", function () {
        it("should return an empty array", () => {
            expect(range(0)).toEqual([]);
        });

        it("should return an array of 5 sequential numbers, starting with 0", () => {
            expect(range(5)).toEqual([0, 1, 2, 3, 4]);
        });

        it("should return an array of 5 sequential numbers, starting with 5 and ending with 0", () => {
            expect(range(0, 5, -1)).toEqual([5, 4, 3, 2, 1]);
        });

        it("should return an array of 5 sequential numbers, starting with 10", () => {
            expect(range(15, 10)).toEqual([10, 11, 12, 13, 14]);
        });

        it("should return an array of 5 sequential numbers, starting with 15 and ending with 11", () => {
            expect(range(10, 15, -1)).toEqual([15, 14, 13, 12, 11]);
        });
    });
});
