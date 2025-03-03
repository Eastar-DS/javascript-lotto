import $LottoGameTitle from "../components/LottoGameTitle/LottoGameTitle.js";
import $BuyLottoForm from "../components/BuyLottoForm/BuyLottoForm.js";

const initWebLottoGame = () => {
  const $lottoGameBox = document.querySelector(".lotto-game-box");

  if (!$lottoGameBox) {
    throw new Error("로또 게임 박스가 없습니다.");
  }
  $lottoGameBox.replaceChildren();

  $lottoGameBox.appendChild($LottoGameTitle());
  $lottoGameBox.appendChild($BuyLottoForm());
};

export default initWebLottoGame;
