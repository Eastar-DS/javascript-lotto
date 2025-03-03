import validationUtils from "../../util/validationUtil.js";
import { LOTTO_NUMBER_RANGE, LOTTO_LENGTH } from "../../constant/definition.js";

const WINNING_NUMBERS = {
  IS_WRONG_ARRAY_LENGTH: `[ERROR] 로또는 ${LOTTO_LENGTH}개의 숫자로 이루어져야합니다.`,
  IS_DUPLICATED_NUMBER: "[ERROR] 중복된 숫자는 입력하실 수 없습니다.",
  IS_ARRAY_NUMBER_RANGE_OVER: `[ERROR] ${LOTTO_NUMBER_RANGE.MIN}~${LOTTO_NUMBER_RANGE.MAX} 사이의 숫자를 입력해야합니다.`,
  IS_NOT_NATURAL_NUMBER_IN_ARRAY: "[ERROR] 숫자는 자연수여야 합니다.",
};

export default class NumbersValidator {
  static validateNumbers(numbers) {
    this.#isWrongArrayLength(numbers);
    this.#isNotNaturalNumberInArray(numbers);
    this.#isDuplicatedNumber(numbers);
    this.#isArrayNumberRangeOver(numbers);
  }

  static #isWrongArrayLength(numbers) {
    if (numbers.length !== LOTTO_LENGTH)
      throw new Error(WINNING_NUMBERS.IS_WRONG_ARRAY_LENGTH);
  }

  static #isNotNaturalNumberInArray(numbers) {
    if (numbers.some((number) => validationUtils.isNotNaturalNumber(number)))
      throw new Error(WINNING_NUMBERS.IS_NOT_NATURAL_NUMBER_IN_ARRAY);
  }

  static #isDuplicatedNumber(numbers) {
    if (new Set(numbers).size !== numbers.length)
      throw new Error(WINNING_NUMBERS.IS_DUPLICATED_NUMBER);
  }

  static #isArrayNumberRangeOver(numbers) {
    if (
      numbers.some((number) =>
        validationUtils.isNumberRangeOver(
          number,
          LOTTO_NUMBER_RANGE.MIN,
          LOTTO_NUMBER_RANGE.MAX
        )
      )
    )
      throw new Error(WINNING_NUMBERS.IS_ARRAY_NUMBER_RANGE_OVER);
  }
}
