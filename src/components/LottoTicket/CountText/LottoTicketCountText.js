const $LottoTicketCountText = (lottoTicketCount) => {
  return createElement("span", {
    textContent: `총 ${lottoTicketCount}개를 구매했습니다.`,
  });
};

export default $LottoTicketCountText;
