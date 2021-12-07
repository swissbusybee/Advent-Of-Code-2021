const fs = require("fs");

const input = fs
  .readFileSync("day7inputdata.txt", { encoding: "utf-8" })
  .split(",")
  .map((p) => parseInt(p));

function getBestPosition(input, linear = true) {
  const fuelConsumption = [];
  const sortedPositions = input.sort((a, b) => b - a);
  for (let i = 0; i < sortedPositions[0]; i++) {
    const positionConsumption = sortedPositions.reduce((total, pos) => {
      const linearDistance = Math.abs(i - pos);
      const fuelNeeded = (linearDistance * (linearDistance + 1)) / 2;
      return (total += linear ? linearDistance : fuelNeeded);
    }, 0);
    fuelConsumption.push(positionConsumption);
  }
  return fuelConsumption.sort((a, b) => a - b)[0];
}

function partOne(input) {
  const bestPosition = getBestPosition(input);
  return bestPosition;
}

function partTwo(input) {
  const bestPosition = getBestPosition(input, false);
  return bestPosition;
}

console.log("Solution to part 1: ", partOne(input));
console.log("Solution to part 2: ", partTwo(input));
