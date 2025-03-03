import { createElement } from "../../../utils/dom/createElement.js";

export const Title = () => {
  return createElement("h2", {
    className: "modal-title",
    innerText: "🏆 당첨 통계 🏆",
  });
};
