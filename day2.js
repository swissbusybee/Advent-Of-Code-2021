const fs = require("fs");

const data = fs
  .readFileSync("day2inputdata.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x));

// helper method
const splitItem = (item) => ({
  move: item.split(" ")[0],
  amount: parseInt(item.split(" ")[1]),
});

//Problem 1
const calculatePosition = (data) => {
  let position = { horizontal: 0, depth: 0 };
  data.forEach((line) => {
    const { move, amount } = splitItem(line);
    if (move === "forward") position.horizontal += amount;
    if (move === "down") position.depth += amount;
    if (move === "up") position.depth -= amount;
  });
  return position.horizontal * position.depth;
};

console.log(calculatePosition(data));

//Problem 2
const calculateComplicatedPosition = (data) => {
  let position = { horizontal: 0, depth: 0, aim: 0 };
  data.forEach((line) => {
    const { move, amount } = splitItem(line);
    if (move === "forward") {
      position.horizontal += amount;
      position.depth += position.aim * amount;
    }
    if (move === "down") position.aim += amount;
    if (move === "up") position.aim -= amount;
  });
  return position.depth * position.horizontal;
};

console.log(calculateComplicatedPosition(data));
