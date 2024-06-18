import { isNewYear } from "./utils";

function simpleYearlyIncrease(
    periods: number[],
    value: number,
    rate: number
): number[] {
    let currentRate: number = 1;

    return periods.map((period: number) => {
        if (isNewYear(period)) {
            currentRate *= 1 + rate;
        }

        return value * currentRate;
    });
}

export { simpleYearlyIncrease };
