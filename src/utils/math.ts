/**
 * 
 * @example Usage:
var a = 5.467;
var truncated = truncateDecimals(a, 2); // = 5.46

 * @param number 
 * @param digits 
 * @returns 
 */
export const truncateDecimals = function (
  number: number,
  digits: number
): number {
  const multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};
