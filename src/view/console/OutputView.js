import { RANK_INFO_TABLE } from "../../constant/rank.js";

class OutputView {
  static printLotto(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);

    lottos.forEach((lotto) => {
      console.log(`[${lotto.numbers.join(", ")}]`);
    });

    OutputView.printEmptyLine();
  }

  static printResult({ prize, profit }) {
    console.log("당첨 통계");
    console.log("--------------------");
    prize.forEach((rankLottos, rank) => {
      const info = RANK_INFO_TABLE[rank];
      console.log(
        `${info.message} 일치 (${info.price.toLocaleString()}원) - ${
          rankLottos.length
        }개`
      );
    });
    console.log(`총 수익률은 ${profit.toFixed(2)}%입니다.`);
  }

  static printEmptyLine() {
    console.log("");
  }

  static printError(error) {
    console.log(`${error.message}\n`);
  }
}

export default OutputView;
