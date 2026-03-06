/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants.js";
import InputView from "./InputView.js";
import LottoGenerator from "./LottoGenerator.js";

class App {
  static async run() {
    const money = await InputView.readMoney("> 구입금액을 입력해 주세요.");
    console.log(money);
    const buyLottoCount = money / LOTTO.PRICE;
    console.log(buyLottoCount);

    // 로또 발행
    const lottos = LottoGenerator.makeLottos(buyLottoCount);
    lottos.forEach((lotto) => console.log(lotto.getNumbers()));

    // 당첨 번호 입력
    const winningNumbers =
      await InputView.readWinningNumbers("> 당첨 번호를 입력해 주세요. ");

    const bonusNumber =
      await InputView.readBonusNumber("> 보너스 번호를 입력해 주세요.");
  }
}
await App.run();
