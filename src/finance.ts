export function range(
    stop: number,
    start: number = 0,
    step: number = 1
): number[] {
    const arr: number[] = [];

    for (let i = start; i < stop; i += step) {
        arr.push(i);
    }

    return arr;
}

export function calcMonthlyPayments(
    period: number[],
    baseRent: number,
    sqft: number
): number[] {
    return [];
}
