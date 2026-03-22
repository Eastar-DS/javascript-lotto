const OutputViewWeb = {
  renderLottos(lottos) {
    const buyCount = document.getElementById("buy-count");
    const lottoList = document.getElementById("lotto-list");

    buyCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;

    // lottoList.innerHTML = ""; 에서 innerHTML 사용 제거
    while (lottoList.firstChild) {
      lottoList.removeChild(lottoList.firstChild);
    }
    lottos.forEach((lotto) => {
      const li = document.createElement("li");
      li.className = "lotto-item";

      const icon = document.createElement("span");
      icon.className = "lotto-icon";
      icon.textContent = "🎟️";

      const numbers = document.createElement("span");
      numbers.textContent = lotto.getNumbers().join(", ");

      li.appendChild(icon);
      li.appendChild(numbers);
      lottoList.appendChild(li);
    });

    document.getElementById("lotto-section").classList.remove("hidden");
    document.getElementById("winning-section").classList.remove("hidden");
  },

  renderResult(allRankCount, rate) {
    document.getElementById("rank-5th").textContent = `${allRankCount.FIFTH}개`;
    document.getElementById("rank-4th").textContent =
      `${allRankCount.FOURTH}개`;
    document.getElementById("rank-3rd").textContent = `${allRankCount.THIRD}개`;
    document.getElementById("rank-2nd").textContent =
      `${allRankCount.SECOND}개`;
    document.getElementById("rank-1st").textContent = `${allRankCount.FIRST}개`;

    document.getElementById("profit-rate-value").textContent = rate;

    document.getElementById("modal-overlay").classList.remove("hidden");
  },

  closeModal() {
    document.getElementById("modal-overlay").classList.add("hidden");
  },

  resetAll() {
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("lotto-section").classList.add("hidden");
    document.getElementById("winning-section").classList.add("hidden");

    document.getElementById("money-input").value = "";
    document.querySelectorAll(".winning-number").forEach((input) => {
      input.value = "";
    });
    document.getElementById("bonus-number").value = "";
  },
};

export default OutputViewWeb;
