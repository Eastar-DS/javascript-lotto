import { SPLIT } from "../constant/definition.js";

const parser = {
  toNumber: (string) => Number(string),
  toSplitNumberArray: (stringNumbers) =>
    stringNumbers.split(SPLIT).map((string) => Number(string)),
};

export default parser;
