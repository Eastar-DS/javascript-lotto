import { createElement } from "../../../utils/dom/createElement.js";

export const RevenueText = (profitRate) => {
  const revenueText = createElement("p", {
    className: "modal-revenue-text",
    innerText: `당신의 총 수익률은 ${profitRate.toLocaleString()}%입니다.`,
  });

  return revenueText;
};
