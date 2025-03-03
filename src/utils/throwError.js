import { ERROR_PREFIX } from "../view/message.js";

export const throwError = (message) => {
  throw new Error(`${ERROR_PREFIX} ${message}`);
};
