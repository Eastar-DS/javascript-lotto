import { createElement } from "../../../utils/dom/createElement.js";
import { ResultItemHeader } from "./ResultItemHeader.js";
import { ResultItem } from "./ResultItem.js";
import { SETTINGS } from "../../../constants/settings.js";

export const ResultList = (rankCounts) => {
  const resultList = createElement("ul", {
    className: "result-list",
  });

  resultList.appendChild(ResultItemHeader());

  const rankInfo = [
    { key: "fifth", label: "3개", prize: SETTINGS.rewards.fifth.amount },
    { key: "fourth", label: "4개", prize: SETTINGS.rewards.fourth.amount },
    { key: "third", label: "5개", prize: SETTINGS.rewards.third.amount },
    {
      key: "second",
      label: "5개 + 보너스볼",
      prize: SETTINGS.rewards.second.amount,
    },
    { key: "first", label: "6개", prize: SETTINGS.rewards.first.amount },
  ];

  rankInfo.forEach(({ key, label, prize }) => {
    resultList.appendChild(ResultItem(label, prize, rankCounts[key]));
  });

  return resultList;
};
