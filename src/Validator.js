import { ERROR_MESSAGE } from "./constants.js";

export function validateNotEmptyString(string) {
  if (string === "") {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validatePositiveNumber(number) {
  if (number <= 0) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validateNumberUpper(upper, number) {
  if (number > upper) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validateNumberLower(lower, number) {
  if (number < lower) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validateStringIsNumber(string) {
  if (isNaN(string)) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validateNumberDivided(number, divideNumber) {
  if (number % divideNumber !== 0) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validateNotDuplicated(array) {
  if (array.length !== new Set(array).size) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}

export function validateArrayLength(array, length) {
  if (array.length !== length) {
    throw new Error(ERROR_MESSAGE.PREFIX);
  }
}
