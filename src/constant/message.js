import { LOTTO_RULE } from "./rule.js";

export const ERROR_MESSAGE = {
  purchaseMoney: {
    notNumber: "구입 금액은 숫자로 입력해야 합니다.",
    notInteger: "구입 금액은 정수로 입력해야 합니다.",
    notPositive: "구입 금액은 양수로 입력해야 합니다.",
    notMultipleOfPurchaseUnit: `구입 금액은 ${LOTTO_RULE.purchaseUnit}원 단위로 입력해야 합니다.`,
  },
  winningNumbers: {
    notNumber: "당첨번호는 숫자로 입력해야 합니다.",
    notInteger: "당첨번호는 정수로 입력해야 합니다.",
    notUnique: "당첨번호는 중복없이 입력해야 합니다.",
    notInRange: `당첨번호는 ${LOTTO_RULE.lottoNumber.min} ~ ${LOTTO_RULE.lottoNumber.max} 사이의 숫자로 입력해야 합니다.`,
    notLottoNumberCount: `당첨번호는 ${LOTTO_RULE.lottoNumber.count}개를 입력해야 합니다.`,
  },
  bonusNumber: {
    notNumber: "보너스번호는 숫자로 입력해야 합니다.",
    notInteger: "보너스번호는 정수로 입력해야 합니다.",
    notInRange: `보너스번호는 ${LOTTO_RULE.lottoNumber.min} ~ ${LOTTO_RULE.lottoNumber.max} 사이의 숫자로 입력해야 합니다.`,
    duplicateWithWinningNumber:
      "보너스번호는 당첨번호와 중복없이 입력해야 합니다.",
  },
  restartRequest: {
    notYorN: "재시작 여부는 y or n으로 입력해야 합니다.",
  },
};
