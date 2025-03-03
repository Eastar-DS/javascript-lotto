const $LottoResultRevenueText = (revenueRate) => {
  return createElement("p", {
    class: "lotto-result-revenue-text",
    textContent: `당신의 총 수익률은 ${revenueRate.toLocaleString()}%입니다.`,
  });
};

export default $LottoResultRevenueText;
