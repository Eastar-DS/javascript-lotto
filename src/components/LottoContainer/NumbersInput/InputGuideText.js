import { createElement } from "../../../utils/dom/createElement.js";

export const InputGuideText = (text) => {
  return createElement("span", {
    className: "input-guide-text",
    textContent: text,
  });
};
