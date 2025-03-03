import { createElement } from "../../../utils/dom/createElement.js";

export const LottoCountText = (lottoCount) => {
  return createElement("span", {
    className: "lotto-count",
    textContent: `총 ${lottoCount}개를 구매하였습니다.`,
  });
};
