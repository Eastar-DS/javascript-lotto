import Utils from "../src/Utils";

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
