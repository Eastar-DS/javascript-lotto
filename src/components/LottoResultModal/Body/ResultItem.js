import { createElement } from "../../../utils/dom/createElement.js";

export const ResultItem = (matchLabel, prizeAmount, winCount) => {
  const resultItem = createElement("li", {
    className: "result-item",
  });

  const matchCount = createElement("span", {
    textContent: matchLabel,
  });

  const prize = createElement("span", {
    textContent: prizeAmount.toLocaleString(),
  });

  const winningCount = createElement("span", {
    textContent: `${winCount}개`,
  });

  resultItem.append(matchCount, prize, winningCount);

  return resultItem;
};
