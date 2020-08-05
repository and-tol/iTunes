/**
 * @function addZero add "0" before number
 * @param n minutes or seconds quantity
 */
export const addZero = (n: number): string => n < 10 ? `0${n}` : `${n}`;
