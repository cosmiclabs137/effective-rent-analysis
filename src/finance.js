import { isNewYear } from "./utils";

function simpleYearlyIncrease(periods, value, rate) {
    let currentRate = 1;

    return periods.map((period) => {
        if (isNewYear(period)) {
            currentRate *= 1 + rate;
        }

        return value * currentRate;
    });
}

export { simpleYearlyIncrease };
