class LottoState {
  #lottos = [];
  #purchaseMoney = 0;

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  addLottos(lottos) {
    this.#lottos = [...this.#lottos, ...lottos];
  }

  getLottos() {
    return Array.from(this.#lottos);
  }

  setPurchaseMoney(money) {
    this.#purchaseMoney = money;
  }

  addPurchaseMoney(money) {
    this.#purchaseMoney += money;
  }

  getPurchaseMoney() {
    return this.#purchaseMoney;
  }

  reset() {
    this.#lottos = [];
    this.#purchaseMoney = 0;
  }
}

export default new LottoState();
