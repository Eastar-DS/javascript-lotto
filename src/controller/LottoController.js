import { MESSAGES, SETTINGS } from "../constants/index.js";
import {
  purchaseAmountValidator,
  lottoNumberValidator,
  bonusNumberValidator,
  restartValidator,
} from "../validators/index.js";
import { readLineAsync } from "../utils/input/readLineAsync.js";
import { retryUntilValid } from "../utils/validation/retryUntilValid.js";
import lottoGenerator from "../domain/lottoGenerator.js";
import output from "../view/output.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";
import LottoMatcher from "../domain/LottoMatcher.js";

class LottoController {
  constructor() {
    this.lottoTickets = [];
    this.winningNumber = [];
    this.bonusNumber = [];
  }

  setContext(lottoTickets, winningNumber, bonusNumber) {
    this.lottoTickets = lottoTickets;
    this.winningNumber = winningNumber;
    this.bonusNumber = bonusNumber;
  }

  async play() {
    await this.runGame();
    await this.handleRestart();
  }

  async runGame() {
    const purchaseAmount = await this.getPurchaseAmount();
    this.lottoTickets = lottoGenerator.generate(purchaseAmount);

    output.printLottoTickets(this.lottoTickets);

    this.winningNumber = await this.getWinningNumber();
    this.bonusNumber = await this.getBonusNumber();

    const matchResults = this.calculateMatchResults();

    this.displayResults(matchResults, purchaseAmount);
  }

  async handleRestart() {
    const shouldRestart = await this.getRestartChoice();
    if (shouldRestart) {
      this.resetGame();
      await this.play();
    }
  }

  resetGame() {
    this.lottoTickets = [];
    this.winningNumber = [];
    this.bonusNumber = [];
  }

  async getRestartChoice() {
    const restartInput = await retryUntilValid(
      async () => {
        const input = await readLineAsync("\n" + MESSAGES.input.askRestart);
        const parsedInput = input.trim().toLowerCase();
        restartValidator(parsedInput);
        return parsedInput;
      },
      (message) => output.print(message)
    );

    return restartInput === SETTINGS.restartCommand;
  }

  async getPurchaseAmount() {
    const purchaseAmount = await retryUntilValid(
      async () => {
        const input = await readLineAsync(MESSAGES.input.purchaseAmount);
        const parsedInput = Number(input);
        purchaseAmountValidator(parsedInput);
        return parsedInput;
      },
      (message) => output.print(message)
    );

    return purchaseAmount;
  }

  async getWinningNumber() {
    const winningNumber = await retryUntilValid(
      async () => {
        const input = await readLineAsync("\n" + MESSAGES.input.winningNumber);
        const parsedInput = input.split(",").map(Number);
        lottoNumberValidator(parsedInput);
        return parsedInput;
      },
      (message) => output.print(message)
    );

    return winningNumber;
  }

  async getBonusNumber() {
    const bonusNumber = await retryUntilValid(
      async () => {
        const input = await readLineAsync("\n" + MESSAGES.input.bonusNumber);
        const parsedInput = Number(input);
        bonusNumberValidator(parsedInput, this.winningNumber);
        return parsedInput;
      },
      (message) => output.print(message)
    );

    return bonusNumber;
  }

  calculateMatchResults() {
    const rankCounts = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
      none: 0,
    };

    const ticketResults = this.lottoTickets.map((ticket) => {
      const rank = new LottoMatcher().calculateRank(
        ticket,
        this.winningNumber,
        this.bonusNumber
      );
      rankCounts[rank]++;
      return { ticket, rank };
    });

    return { ticketResults, rankCounts };
  }

  displayResults(matchResults, purchaseAmount) {
    const { rankCounts } = matchResults;

    const profitStats = new ProfitCalculator().getProfitStats(
      rankCounts,
      purchaseAmount
    );

    const results = {
      rankCounts,
      totalPrize: profitStats.totalPrize,
      profitRate: profitStats.profitRate,
    };

    output.printMatchResults(results);
  }
}

export default LottoController;
