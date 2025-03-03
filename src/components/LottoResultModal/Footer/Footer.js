import { createElement } from "../../../utils/dom/createElement.js";
import { RetryButton } from "./RetryButton.js";
import { RevenueText } from "./RevenueText.js";

export const Footer = (profitRate) => {
  const footer = createElement("div", { className: "modal-footer" });
  footer.append(RevenueText(profitRate), RetryButton());

  return footer;
};
