import { RANK_INFO_TABLE } from "../../constant/rank.js";
import { createDOMElement } from "../../util/createDOMElement.js";

export const createBodyTable = (prize) => {
  const tableData = [["일치 갯수", "당첨금", "당첨 갯수"]];

  prize.forEach((rankLottos, rank) => {
    const info = RANK_INFO_TABLE[rank];
    tableData.push([
      info.message,
      info.price.toLocaleString(),
      `${rankLottos.length}개`,
    ]);
  });

  return createDOMElement({
    tag: "div",
    class: "modal_table",
    children: [
      ...tableData
        .map((rowData) => [
          createDOMElement({ tag: "div", class: "modal_table_divider" }),
          createDOMElement({
            tag: "div",
            class: "modal_table_row",
            children: rowData.map((cellText) =>
              createDOMElement({
                tag: "p",
                class: "modal_table_cell",
                textContent: cellText,
              })
            ),
          }),
        ])
        .flat(),
      createDOMElement({ tag: "div", class: "modal_table_divider" }),
    ],
  });
};
