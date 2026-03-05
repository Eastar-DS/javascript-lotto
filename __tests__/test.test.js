import { ERROR_MESSAGE } from "../src/constants";
import Lotto from "../src/Lotto";
import LottoGenerator from "../src/LottoGenerator";
import Utils from "../src/Utils";
import WinningLotto from "../src/WinningLotto";

describe("로또 발행 테스트", () => {
  test("구매한 로또의 개수를 올바르게 계산해야 한다.", () => {
    // given
    const money = 10_000;

    // when & then
    expect(LottoGenerator.calculateBuyLottoCount(money)).toEqual(10);
  });

  test("로또를 생성한다.", () => {
    // given
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);

    // when & then
    expect(lotto).toBeInstanceOf(Lotto);
  });

  test("0이 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [0, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("음의 정수가 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [-1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("1~45 사이가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 2, 3, 4, 5, 100];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("번호가 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("로또 번호가 6개가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("로또 생성 시 번호를 오름차순으로 올바르게 정렬해야 한다", () => {
    // given
    const unSortedNunmbers = [6, 5, 4, 3, 2, 1];

    // when
    const lotto = new Lotto(unSortedNunmbers);

    // then
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("구입 수량만큼 로또를 발행해야 한다", () => {
    // given
    const buyLottoCount = 10;

    // when
    const lottos = LottoGenerator.makeLottos(buyLottoCount);

    // then
    expect(lottos.length).toEqual(buyLottoCount);
  });
});

describe("유틸 함수 테스트", () => {
  test("1~45 사이의 무작위 숫자 하나를 반환해야 한다", () => {
    // given & when
    const randomNumber = Utils.getRandomNumber(1, 45);

    // then 나중에 모킹 해놓기
    expect(randomNumber >= 1 && randomNumber <= 45).toEqual(true);
  });

  test("1~45 사이의 중복되지 않는 무작위 숫자 6개를 반환해야 한다", () => {
    // given
    const count = 6;

    // when
    const randomNumbers = Utils.getRandomNumbers(1, 45, count);

    // then 나중에 모킹 해놓기
    expect(randomNumbers.length).toEqual(count);
    expect(randomNumbers.length === new Set(randomNumbers).size).toEqual(true);
  });
});

describe("당첨 로또 테스트", () => {
  test("당첨 로또를 생성한다.", () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    // then
    expect(winningLotto).toBeInstanceOf(WinningLotto);
  });

  test("당첨 번호에 0이 포함된 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [0, 1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("당첨 번호에 음의 정수가 포함된 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [-1, 1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("당첨 번호에 1~45 사이가 아닌 값이 포함된 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [1, 2, 3, 4, 5, 100];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("당첨 번호가 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [1, 1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("당첨 번호가 6개가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  // 보너스 번호

  test("보너스 번호가 0인 경우 에러를 발생시킨다", () => {
    // given
    const winningNUmbers = [1, 2, 3, 4, 5, 6];
    const wrongBonusNumber = 0;
    // when & then
    expect(() => new WinningLotto(winningNUmbers, wrongBonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("보너스 번호가 음의 정수인 경우 에러를 발생시킨다", () => {
    // given
    const winningNUmbers = [1, 2, 3, 4, 5, 6];
    const wrongBonusNumber = -1;
    // when & then
    expect(() => new WinningLotto(winningNUmbers, wrongBonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("보너스 번호가 1~45 사이가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const winningNUmbers = [1, 2, 3, 4, 5, 6];
    const wrongBonusNumber = 46;
    // when & then
    expect(() => new WinningLotto(winningNUmbers, wrongBonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("보너스 번호가 당첨 번호와 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const winningNUmbers = [1, 2, 3, 4, 5, 6];
    const wrongBonusNumber = 1;
    // when & then
    expect(() => new WinningLotto(winningNUmbers, wrongBonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });
});

describe("당첨 여부 테스트", () => {
  test("구매한 로또 하나와 당첨로또를 비교해서 일치하는 번호의 개수를 반환해야한다", () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 8, 9]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    // when
    const matchCount = winningLotto.getMatchCount(lotto);

    // then
    expect(matchCount).toEqual(4);
  });

  test("구매한 로또 번호에 보너스 번호가 포함되어 있는지 확인해야 한다", () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 8, 9]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 9);

    // when
    const hasBonus = winningLotto.hasBonus(lotto);

    // then
    expect(hasBonus).toEqual(true);
  });
});
