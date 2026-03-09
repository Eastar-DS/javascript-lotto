import { ERROR_MESSAGE } from "../src/constants";
import {
  validateArrayLength,
  validateNotDuplicated,
  validateNotEmptyString,
  validateNumberDivided,
  validateStringIsNumber,
} from "../src/Validator";

describe("유효성 검증 테스트", () => {
  test("입력된 문자열이 빈 값이면 에러를 발생시켜야 한다", () => {
    // given
    const wrongInput = "";

    // when & then
    expect(() => validateNotEmptyString(wrongInput)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });
  test("입력된 문자열이 숫자가 아니면 에러를 발생시켜야 한다", () => {
    // given
    const wrongInput = "NoNumber";

    // when & then
    expect(() => validateStringIsNumber(wrongInput)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("숫자가 특정 값으로 나누어 떨어지지 않으면 에러를 발생시켜야 한다", () => {
    // given
    const divideNumber = 1000;
    const wrongInput = 1500;

    // when & then
    expect(() => validateNumberDivided(wrongInput, divideNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("배열에 중복된 원소가 존재하면 에러를 발생시켜야 한다", () => {
    // given
    const wrongArray = [1, 1, 2, 3, 4, 5];

    // when & then
    expect(() => validateNotDuplicated(wrongArray)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("배열의 길이가 올바르지 않으면 에러를 발생시켜야 한다", () => {
    // given
    const wrongArray = [1, 2, 3, 4, 5];

    // when & then
    expect(() => validateArrayLength(wrongArray, 6)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });
});
