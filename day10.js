const fs = require("fs");

const lines = fs
  .readFileSync("day10inputdata.txt", { encoding: "utf-8" })
  .split("\n");

const open = ["(", "[", "{", "<"];
const close = [")", "]", "}", ">"];

const points = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
let score = 0;

lines.forEach((line) => {
  let stack = [];

  for (let i = 0; i < line.length; i++) {
    if (open.includes(line[i])) {
      stack.push(line[i]);
    } else {
      if (close.indexOf(line[i]) == open.indexOf(stack[stack.length - 1])) {
        stack.pop();
      } else {
        score += points[line[i]];
        break;
      }
    }
  }
});

console.log("Part One", score);

const pointsPart2 = { ")": 1, "]": 2, "}": 3, ">": 4 };
let scoresPart2 = [];

lines.forEach((line) => {
  let stackPart2 = [];
  let incomplete = true;

  for (let i = 0; i < line.length; i++) {
    if (open.includes(line[i])) {
      stackPart2.push(line[i]);
    } else {
      if (
        close.indexOf(line[i]) ==
        open.indexOf(stackPart2[stackPart2.length - 1])
      ) {
        stackPart2.pop();
      } else {
        incomplete = false;
        break;
      }
    }
  }

  if (incomplete) {
    let scorePart2 = 0;
    for (let i = stackPart2.length - 1; i >= 0; i--) {
      scorePart2 =
        scorePart2 * 5 + pointsPart2[close[open.indexOf(stackPart2[i])]];
    }
    scoresPart2.push(scorePart2);
  }
});

const middleScore = scoresPart2.sort((a, b) => a - b)[
  Math.floor(scoresPart2.length / 2)
];

console.log("Part Two", middleScore);
