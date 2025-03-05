import { createDOMElement } from "../../util/createDOMElement.js";
import { createBodyTable } from "./createBodyTable.js";

export const createModalBody = (result) => {
  return createDOMElement({
    tag: "div",
    class: "modal_wrapper",
    children: [
      createDOMElement({
        tag: "h2",
        class: "modal_title",
        textContent: "🏆 당첨 통계 🏆",
      }),
      createBodyTable(result.prize),
      createDOMElement({
        tag: "p",
        class: "modal_profit_text",
        textContent: `당신의 총 수익률은 ${result.profit.toFixed(2)}%입니다.`,
      }),
      createDOMElement({
        tag: "button",
        class: "modal_restart_button",
        id: "modalRestartButton",
        type: "button",
        textContent: "다시 시작하기",
      }),
    ],
  });
};
