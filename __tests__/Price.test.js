import { Price } from "../src/domain/Price.js";

test("구매금액이 입력했을 때, 정확한 구매 금액을 반환한다.", () => {
  // given
  const testPrice = 3000;

  // when
  const price = new Price(testPrice);

  // then
  expect(price.getPrice()).toBe(testPrice);
});
