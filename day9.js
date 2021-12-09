const fs = require("fs");

const lines = fs
  .readFileSync("day9inputdata.txt", { encoding: "utf-8" })
  .split("\n");

const arr = [];

lines.forEach((line) => {
  arr.push(line.split(""));
});

const locations = [];

function adjacent(x, y) {
  const left = arr[x][y - 1] == undefined ? Infinity : arr[x][y - 1];
  const right = arr[x][y + 1] == undefined ? Infinity : arr[x][y + 1];
  const up = arr[x - 1] == undefined ? Infinity : arr[x - 1][y];
  const down = arr[x + 1] == undefined ? Infinity : arr[x + 1][y];

  return [left, right, up, down];
}

function lowPoints() {
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      const loc = arr[x][y];

      const [left, right, up, down] = adjacent(x, y);

      if (loc < left && loc < right && loc < up && loc < down) {
        locations.push(loc);
      }
    }
  }
}

lowPoints();

let sum = 0;
locations.map((x) => {
  sum += parseInt(x) + 1;
});

console.log("Part One", sum);

// Part Two
