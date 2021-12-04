const fs = require("fs");

const data = fs
  .readFileSync("day1inputdata.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x));

//How many measurements are larger than the previous measurement?
//Problem 1
const depthMeasurementIncreaseCount = (lines) =>
  lines
    .map(Number)
    .map((line, i) => line - lines[i - 1])
    .slice(1)
    .filter((v) => v > 0).length;

//Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
//Problem 2
const slidingWindowSum = (lines) =>
  depthMeasurementIncreaseCount(
    lines
      .map(Number)
      .map((line, i, arr) => line + arr[i + 1] + arr[i + 2])
      .slice(0, lines.length - 2)
  );

console.log(depthMeasurementIncreaseCount(data));
console.log(slidingWindowSum(data));
