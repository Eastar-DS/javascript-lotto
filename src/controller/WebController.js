import purchaseAmountValidator from "../validators/purchaseAmountValidator.js";
import lottoGenerator from "../domain/lottoGenerator.js";
import lottoNumberValidator from "../validators/lottoNumberValidator.js";
import bonusNumberValidator from "../validators/bonusNumberValidator.js";
import { LottoTicketContainer } from "../components/LottoContainer/LottoTicket/LottoTicketContainer.js";
import { NumbersInputContainer } from "../components/LottoContainer/NumbersInput/NumbersInputContainer.js";
import { LottoResultModal } from "../components/LottoResultModal/LottoResultModal.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";
import LottoMatcher from "../domain/LottoMatcher.js";
import { $, $$ } from "../utils/dom/selectors.js";

const initializeEventListeners = () => {
  const lottoPurchaseForm = $(".lotto-purchase-form");

  if (!lottoPurchaseForm) return;

  lottoPurchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLottoPurchase();
  });
};

const handleLottoPurchase = () => {
  try {
    const purchaseAmount = validateAndSetPurchaseAmount();
    const lottos = lottoGenerator.generate(purchaseAmount);
    LottoTicketContainer(lottos);
    showNumberInputSection(purchaseAmount, lottos);
    disablePurchaseButton();
  } catch (error) {
    window.alert(error.message);
  }
};

const validateAndSetPurchaseAmount = () => {
  const purchaseAmountInput = $(".purchase-amount-input");
  const purchaseAmount = Number(purchaseAmountInput.value);
  purchaseAmountValidator(purchaseAmount);
  return purchaseAmount;
};

const showNumberInputSection = (purchaseAmount, lottos) => {
  const lottoContainer = $(".lotto-container");

  const $numbersInputContainer = NumbersInputContainer();
  lottoContainer.append($numbersInputContainer);

  const resultButton = $(".result-button");
  resultButton.addEventListener("click", (event) => {
    event.preventDefault();
    handleWinningNumberSubmit(purchaseAmount, lottos);
  });
};

const disablePurchaseButton = () => {
  const purchaseButton = $(".lotto-purchase-submit-button");
  if (purchaseButton) {
    purchaseButton.disabled = true;
  }
};

const getWinningNumbers = () => {
  const winningNumberInputs = $$(".winning-number-input");
  return Array.from(winningNumberInputs).map((input) =>
    Number(input.value.trim())
  );
};

const getBonusNumber = () => {
  const bonusNumberInput = $(".bonus-number-input");
  return Number(bonusNumberInput.value.trim());
};

const validateLottoNumbers = (winningNumbers, bonusNumber) => {
  lottoNumberValidator(winningNumbers);
  bonusNumberValidator(bonusNumber, winningNumbers);
};

const handleWinningNumberSubmit = (purchaseAmount, lottos) => {
  try {
    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    validateLottoNumbers(winningNumbers, bonusNumber);

    const matchResults = calculateMatchResults(
      lottos,
      winningNumbers,
      bonusNumber
    );
    const profitStats = calculateProfitStats(matchResults, purchaseAmount);

    LottoResultModal(matchResults, profitStats.profitRate);
  } catch (error) {
    window.alert(error.message);
  }
};

const calculateMatchResults = (lottos, winningNumbers, bonusNumber) => {
  const rankCounts = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    none: 0,
  };

  const lottoMatcher = new LottoMatcher();
  lottos.forEach((ticket) => {
    const rank = lottoMatcher.calculateRank(
      ticket,
      winningNumbers,
      bonusNumber
    );
    rankCounts[rank]++;
  });

  return rankCounts;
};

const calculateProfitStats = (rankCounts, purchaseAmount) => {
  const profitCalculator = new ProfitCalculator();
  return profitCalculator.getProfitStats(rankCounts, purchaseAmount);
};

export const resetApp = () => {
  const appContainer = $("#app");

  if (!window.initialAppState) return;

  appContainer.replaceChildren();

  const newAppState = window.initialAppState.cloneNode(true);
  appContainer.appendChild(newAppState);

  initializeEventListeners();
};

export default initializeEventListeners;
