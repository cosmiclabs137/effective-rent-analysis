import { toBeDeepCloseTo, toMatchCloseTo } from "jest-matcher-deep-close-to";

import { range } from "./utils";

import { simpleYearlyIncrease } from "./finance";

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe("finance", function () {
    describe("#simpleYearlyIncrease", function () {
        it("should return an empty array", () => {
            expect(simpleYearlyIncrease(range(0), 0, 0)).toEqual([]);
            expect(simpleYearlyIncrease(range(0), 1, 0)).toEqual([]);
            expect(simpleYearlyIncrease(range(0), -1, 0)).toEqual([]);
            expect(simpleYearlyIncrease(range(0), 0, 1)).toEqual([]);
            expect(simpleYearlyIncrease(range(0), 0, -1)).toEqual([]);
        });

        it("should return an array of 5 ones", () => {
            expect(simpleYearlyIncrease(range(5), 1, 0)).toEqual([
                1, 1, 1, 1, 1,
            ]);
            expect(simpleYearlyIncrease(range(5), 1, -1)).toEqual([
                1, 1, 1, 1, 1,
            ]);
            expect(simpleYearlyIncrease(range(5), 1, 1)).toEqual([
                1, 1, 1, 1, 1,
            ]);
        });

        it("should return an array of 5 elements starting at one and doubling", () => {
            expect(simpleYearlyIncrease(range(24), 1, 1)).toEqual([
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2,
            ]);
        });

        it("should increase by 10% each new year", () => {
            expect(simpleYearlyIncrease(range(36), 1, 0.1)).toBeDeepCloseTo([
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1, 1.1, 1.1, 1.1, 1.1,
                1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.21, 1.21, 1.21, 1.21, 1.21,
                1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21,
            ]);
        });
    });
});
