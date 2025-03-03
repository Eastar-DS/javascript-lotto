import { ERROR, INPUT, OUTPUT, RETRY_STRING } from "./view/message.js";
import Input from "./view/Input.js";
import Output from "./view/Output.js";
import { divideByUnit } from "./utils/count.js";
import { Lotto } from "./domain/Lotto.js";
import { LottoMachine } from "./domain/LottoMachine.js";
import { LottoResult } from "./domain/LottoResult.js";
import { throwError } from "./utils/throwError.js";
import LottoShop from "./domain/LottoShop.js";
import { Price, PRICE } from "./domain/Price.js";
import { LottoNumber } from "./domain/LottoNumber.js";

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const priceInput = async () =>
  Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.PRICE);
    const price = new Price(input);
    return Number(price.getPrice());
  });

const getNeededLottoNumbers = async () => {
  const winningLotto = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.WINNER_NUMBERS);
    const winningNumbersArray = input.split(",").map(Number);
    const winningLotto = new Lotto(winningNumbersArray);
    return winningLotto;
  });

  const bonusLottoNumber = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.BONUS_NUMBER);
    const bonusLotto = new LottoNumber(input);
    return Number(bonusLotto.getValue());
  });
  return { winningLotto, bonusLottoNumber };
};

const game = async () => {
  const price = await priceInput();

  const countNumber = divideByUnit(PRICE.UNIT, price);
  Output.print(`${countNumber}${OUTPUT.BUY_COUNT}`);

  const lottos = LottoShop.createLottos(countNumber);
  Output.printLottoNumber(lottos);

  const { winningLotto, bonusLottoNumber } = await getNeededLottoNumbers();
  Output.print(OUTPUT.WINNING_HISTORY);
  Output.print(OUTPUT.LINE);

  const lottoMachine = new LottoMachine(lottos);
  const lottoStatus = lottoMachine.getMatchedLottoStatus(
    winningLotto.getLottoNumbers(),
    bonusLottoNumber
  );

  const lottoResult = new LottoResult(lottoStatus, price);
  const lottoHistory = lottoResult.getWinningHistory();

  Output.printWinningHistory(lottoHistory);
  Output.printTotalProfit(lottoResult.getRate());
};

const start = async () => {
  await game();

  const retry = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.RETRY);
    if (![RETRY_STRING.Yes, RETRY_STRING.No].includes(input.toUpperCase())) {
      throwError(ERROR.INVALID_RETRY_STRING);
    }
    return input.toUpperCase();
  });

  if (retry === "y") await game();
};

start();
