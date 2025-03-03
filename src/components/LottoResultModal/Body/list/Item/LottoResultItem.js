const $LottoResultItem = (matchKey, prizeMoney, matchCount) => {
  const $lottoResultItem = createElement("li", {
    class: "lotto-result-item",
  });

  $lottoResultItem.appendChild(
    createElementsFragment([
      createElement("span", {
        textContent: matchKey === "5B" ? "5개 + 보너스볼" : `${matchKey}개`,
      }),
      createElement("span", {
        textContent: prizeMoney.toLocaleString(),
      }),
      createElement("span", {
        textContent: `${matchCount}개`,
      }),
    ])
  );

  return $lottoResultItem;
};

export default $LottoResultItem;
