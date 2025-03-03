import Button from "../../common/Button/Button.js";
import Input from "../../common/Input/Input.js";
import { LottoNumber as LottoNumberDomain } from "../../../../src/domain/LottoNumber.js";
import { Lotto as LottoDomain } from "../../../../src/domain/Lotto.js";
import Modal from "../../common/Modal/Modal.js";
import Component from "../../../core/component.js";

export default class NumberForm extends Component {
  static savedWinningNumbers = Array(6).fill("");
  static savedBonusNumber = "";

  constructor() {
    super();
    this.initState();
    this.setDefaultProps();
  }

  initState() {
    this.state = {
      winningNumbers: [...NumberForm.savedWinningNumbers],
      bonusNumber: NumberForm.savedBonusNumber,
    };
  }

  setDefaultProps() {
    this.props = {
      onSubmit: () => {},
    };
  }

  updateWinningNumber(index, value) {
    const winningNumbers = [...this.state.winningNumbers];
    winningNumbers[index] = value;
    NumberForm.savedWinningNumbers[index] = value;

    this.setState({ winningNumbers });
  }

  updateBonusNumber(value) {
    NumberForm.savedBonusNumber = value;
    this.setState({ bonusNumber: value });
  }

  submitData() {
    try {
      const { winningNumbers, bonusNumber } = this.state;

      const winningLotto = new LottoDomain(winningNumbers.map(Number));
      const bonusLottoNumber = new LottoNumberDomain(Number(bonusNumber));

      this.props.onSubmit({
        winningNumbers: winningLotto,
        bonusNumber: bonusLottoNumber,
      });
    } catch (error) {
      this.handleError(error.message);
    }
  }

  handleError(error) {
    const cleanMessage = error.replace("[ERROR] ", "");
    this.showErrorModal(cleanMessage);
  }

  showErrorModal(message) {
    const modal = new Modal();
    modal.setProps({
      title: "🚨 에러 🚨",
      content: message,
      isModalShow: true,
      key: "number-error-modal",
    });
    modal.open();
  }

  renderWinningInputs() {
    const winningInputs = Array(6)
      .fill()
      .map((_, index) => {
        const input = this.addChild(Input);
        return input.render({
          placeholder: "0",
          value: this.state.winningNumbers[index],
          styles: {
            width: "36px",
          },
          id: `winning-input-${index}`,
        });
      });

    return winningInputs;
  }

  renderBonusInput() {
    const bonusInput = this.addChild(Input);
    return bonusInput.render({
      placeholder: "0",
      value: this.state.bonusNumber,
      styles: {
        width: "36px",
      },
      id: "bonus-input",
    });
  }

  renderSubmitButton() {
    const submitButton = this.addChild(Button);
    return submitButton.render({
      content: "결과 확인하기",
      classList: ["w-full", "inline-flex", "justify-center", "items-center"],
      id: "result-submit-button",
    });
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const winningInputsHTML = this.renderWinningInputs().join("");
      const bonusInputHTML = this.renderBonusInput();
      const submitButtonHTML = this.renderSubmitButton();

      return `
        <form id="number-form" class="w-full">
          <div class="w-full flex flex-row justify-center items-center text-lg font-regular" style="gap: 20px;">
            <div class="flex flex-col gap-10">
              당첨 번호
              <div class="flex flex-row gap-10">
                ${winningInputsHTML}
              </div>
            </div>
            <div class="flex flex-col justify-end items-end gap-10 text-right" style="width: 50%;">
              보너스 번호
              <div class="flex flex-row" style="width: 36px;">
                ${bonusInputHTML}
              </div>
            </div>
          </div>
          <div class="w-full flex flex-row justify-start items-center mt-20" >
            ${submitButtonHTML}
          </div>
        </form>
      `;
    };
  }

  setEvent() {
    this.setupButtonEvents();
    this.setupWinningInputEvents();
    this.setupBonusInputEvents();
    this.setupFormEvents();
  }

  setupButtonEvents() {
    const button = document.getElementById("result-submit-button");
    if (button) {
      button.addEventListener("click", this.submitData.bind(this));
    }
  }

  setupWinningInputEvents() {
    [...Array(6).keys()]
      .map((i) => document.getElementById(`winning-input-${i}`))
      .forEach((input, i) => {
        input.addEventListener("input", (e) => {
          this.updateWinningNumber(i, e.target.value);
        });
      });
  }

  setupBonusInputEvents() {
    const bonusInput = document.getElementById("bonus-input");
    if (bonusInput) {
      bonusInput.addEventListener("input", (e) => {
        this.updateBonusNumber(e.target.value);
      });
    }
  }

  setupFormEvents() {
    const form = document.getElementById("number-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitData();
      });
    }
  }
  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}
