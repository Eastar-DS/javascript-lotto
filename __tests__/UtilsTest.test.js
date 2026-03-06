import { LOTTO } from "../src/constants";
import Utils from "../src/Utils";

describe("유틸 함수 테스트", () => {
  test(`${LOTTO.LOWER}~${LOTTO.UPPER} 사이의 무작위 숫자 하나를 반환해야 한다`, () => {
    // given & when
    const randomNumber = Utils.getRandomNumber(LOTTO.LOWER, LOTTO.UPPER);

    // then 나중에 모킹 해놓기
    expect(randomNumber >= LOTTO.LOWER && randomNumber <= LOTTO.UPPER).toEqual(
      true,
    );
  });

  test(`${LOTTO.LOWER}~${LOTTO.UPPER} 사이의 중복되지 않는 무작위 숫자 ${LOTTO.COUNT}개를 반환해야 한다`, () => {
    // given
    const count = LOTTO.COUNT;

    // when
    const randomNumbers = Utils.getRandomNumbers(
      LOTTO.LOWER,
      LOTTO.UPPER,
      count,
    );

    // then 나중에 모킹 해놓기
    expect(randomNumbers.length).toEqual(count);
    expect(randomNumbers.length === new Set(randomNumbers).size).toEqual(true);
  });
});
