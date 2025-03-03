import { ERROR } from "../view/message.js";
import { throwError } from "./throwError.js";

export const isEmpty = (value) => {
  if (value === "") {
    throwError(ERROR.EMPTY);
  }
};

export const isRange = ({ min, max }, number) => {
  if (number < min || number > max) {
    throwError(ERROR.INVALID_RANGE);
  }
};

export const isNumber = (value) => {
  if (isNaN(value)) {
    throwError(ERROR.NOT_NUMBER);
  }
};
