import { createElement } from "../../../utils/dom/createElement.js";

export const ResultItemHeader = () => {
  const resultItemHeader = createElement("li", {
    className: "result-item-header",
  });

  const matchCount = createElement("span", {
    textContent: "일치 갯수",
  });

  const prizeAmount = createElement("span", {
    textContent: "당첨금",
  });

  const winningCount = createElement("span", {
    textContent: "당첨 갯수",
  });

  resultItemHeader.append(matchCount, prizeAmount, winningCount);

  return resultItemHeader;
};
