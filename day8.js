const fs = require("fs");

const lines = fs
  .readFileSync("day8inputdata.txt", { encoding: "utf-8" })
  .split("\n");

let partOneCodes = { 1: 0, 4: 0, 7: 0, 8: 0 };

lines.forEach((x) => {
  let pattern = x.split(" | ")[1];

  pattern.split(" ").forEach((code) => {
    switch (code.length) {
      case 2:
        partOneCodes[1] = partOneCodes[1] + 1;
        break;
      case 3:
        partOneCodes[7] = partOneCodes[7] + 1;
        break;
      case 4:
        partOneCodes[4] = partOneCodes[4] + 1;
        break;
      case 7:
        partOneCodes[8] = partOneCodes[8] + 1;
        break;
      default:
        break;
    }
  });
});

console.log(
  "Part One",
  Object.values(partOneCodes).reduce((acc, num) => acc + num)
);

let codes = {
  0: "",
  1: "",
  2: "",
  3: "",
  3: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
};

let finalCode = [];

lines.forEach((x) => {
  let mainPattern = x.split(" | ")[0];
  let codePattern = x.split(" | ")[1];

  // First I set the initialCodes that we are sure there will be, this are 1, 4, 7, 8
  initialCodes(mainPattern);

  // Then I set the number 0, 6 and 9 with length 6
  setLengthSix(mainPattern);

  // Then I set the number 2, 3 and 5 with length 5, because they depend on number 6
  setLengthFive(mainPattern);

  // Once we have all the codes, get the final code
  checkFinalCode(codePattern);
});

function setLengthSix(mainPattern) {
  mainPattern.split(" ").forEach((code) => {
    if (code.length == 6) {
      if (!includeChars(code, codes[1])) {
        codes[6] = code;
      } else if (includeChars(code, codes[4])) {
        codes[9] = code;
      } else {
        codes[0] = code;
      }
    }
  });
}

function setLengthFive(mainPattern) {
  mainPattern.split(" ").forEach((code) => {
    if (code.length == 5) {
      if (includeChars(code, codes[1])) {
        codes[3] = code;
      } else if (isFive(code, codes[6])) {
        codes[5] = code;
      } else {
        codes[2] = code;
      }
    }
  });
}

// set the codes that have uniq length, 1, 4, 7, 8
function initialCodes(mainPattern) {
  mainPattern.split(" ").forEach((code) => {
    switch (code.length) {
      case 2:
        codes[1] = code;
        break;
      case 3:
        codes[7] = code;
        break;
      case 4:
        codes[4] = code;
        break;
      case 7:
        codes[8] = code;
        break;
      default:
        break;
    }
  });
}

// Is 5 if the code have the same length as the number 6 minus 1
function isFive(code, chars) {
  let count = 0;

  [...chars].forEach((x) => {
    if (code.includes(x)) {
      count++;
    }
  });

  return count == chars.length - 1 ? true : false;
}

// check if the code includes the chars
function includeChars(code, chars) {
  let count = 0;

  [...chars].forEach((x) => {
    if (code.includes(x)) {
      count++;
    }
  });

  return count == chars.length ? true : false;
}

// check if the code have exactily the same chars, abcd / cdab
function exactChars(code, chars) {
  let count = 0;

  [...chars].forEach((x) => {
    if (code.includes(x)) {
      count++;
    }
  });

  return count === code.length && code.length == chars.length ? true : false;
}

// run the logic for the second part of the input the next to |
function checkFinalCode(codePattern) {
  let codeNums = [];

  codePattern.split(" ").forEach((code) => {
    for (const [key, value] of Object.entries(codes)) {
      if (exactChars(code, value)) {
        codeNums.push(key);
      }
    }
  });

  finalCode.push(codeNums.join(""));
}

console.log(
  "Part Two",
  finalCode.map((x) => parseInt(x)).reduce((acc, curr) => acc + curr)
);
