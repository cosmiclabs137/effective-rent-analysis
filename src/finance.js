import { pmt, pv, PaymentDueTime } from "financial";

import { isNewYear } from "./utils";

const beginDue = PaymentDueTime.Begin;
const endDue = PaymentDueTime.End;

function simpleYearlyIncrease(periods, value, rate) {
    let currentRate = 1;

    return periods.map((period) => {
        if (isNewYear(period)) {
            currentRate *= 1 + rate;
        }

        return value * currentRate;
    });
}

// present value of concessions
const pvocs = (
    rate,
    abatements,
    tiAllowance,
    otherNonRecurringCosts,
    otherRecurringContributions
) => {
    const pvs = abatements.map((abatement, index) => {
        const fv =
            abatement +
            tiAllowance[index] +
            otherNonRecurringCosts[index] +
            otherRecurringContributions[index];
        return -pv(rate, index, 0, fv, endDue);
    });

    return pvs.reduce((acc, val) => acc + val, 0);
};

const toCurrency = (num) => {
    const formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(num >= 0 ? num : -num);
    return num >= 0 ? formatted : `(${formatted})`;
};

export { beginDue, endDue, pmt, pv, pvocs, simpleYearlyIncrease, toCurrency };
