import Component from "../../../core/component.js";
import { Price as PriceDomain } from "../../../../src/domain/Price.js";
import { PRICE } from "../../../../src/domain/Price.js";
import { divideByUnit } from "../../../../src/utils/count.js";
import LottoShop from "../../../../src/domain/LottoShop.js";
import Text from "../../common/Text/Text.js";
import Input from "../../common/Input/Input.js";
import Button from "../../common/Button/Button.js";
import Modal from "../../common/Modal/Modal.js";

export default class PriceForm extends Component {
  static savedPrice = "";

  constructor() {
    super();
    this.initState();
    this.setDefaultProps();
  }

  initState() {
    this.state = {
      price: PriceForm.savedPrice || "",
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "price-form",
      onPurchase: () => {},
    };
  }

  updatePrice(newValue) {
    PriceForm.savedPrice = newValue;
    this.setState({
      price: newValue,
    });
  }

  processLottoPurchase() {
    try {
      const price = new PriceDomain(this.state.price);
      const countNumber = this.calculateLottoCount(price);
      const lottos = this.generateLottos(countNumber);

      this.notifyPurchase(countNumber, lottos);
    } catch (error) {
      this.handleError(error);
    }
  }

  calculateLottoCount(price) {
    return divideByUnit(PRICE.UNIT, Number(price.getPrice()));
  }

  generateLottos(count) {
    return LottoShop.createLottos(count);
  }

  notifyPurchase(count, numbers) {
    if (this.props.onPurchase) {
      this.props.onPurchase({
        count,
        numbers,
        showMachineResult: true,
        showWinningNumberSection: true,
      });
    }
  }

  handleError(error) {
    const cleanMessage = error.message.replace("[ERROR] ", "");
    this.showErrorModal(cleanMessage);
  }

  showErrorModal(message) {
    const modal = new Modal();
    modal.setProps({
      title: "🚨 에러 🚨",
      content: message,
      isModalShow: true,
      key: "result-modal",
    });
    modal.open();
  }

  renderPriceLabel() {
    const labelText = this.addChild(Text);
    return labelText.render({
      content: "구입할 금액을 입력해주세요.",
      classList: ["text-lg", "font-regular"],
    });
  }

  renderPriceInput() {
    const inputField = this.addChild(Input);
    return inputField.render({
      placeholder: "금액 입력",
      value: this.state.price,
      id: "price-input",
    });
  }

  renderSubmitButton() {
    const submitButton = this.addChild(Button);
    return submitButton.render({
      content: "구입",
      onClick: () => this.processLottoPurchase(),
      classList: [
        "inline-flex",
        "justify-center",
        "items-center",
        "rounded-md",
      ],
      styles: {
        width: "56px",
      },
      id: "purchase-button",
    });
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const renderedText = this.renderPriceLabel();
      const renderedInput = this.renderPriceInput();
      const renderedButton = this.renderSubmitButton();

      return `
        <form id="price-form" class="w-full gap-10" >
          ${renderedText}
          <div class="w-full flex flex-row justify-between items-center gap-10" style=" margin-top: 8px;">
            ${renderedInput}
            ${renderedButton}
          </div>
        </form>
      `;
    };
  }

  setEvent() {
    this.setupInputEvents();
    this.setupButtonEvents();
    this.setupFormEvents();
  }

  setupInputEvents() {
    const input = document.getElementById("price-input");
    if (input) {
      input.addEventListener("input", (e) => this.updatePrice(e.target.value));
    }
  }

  setupButtonEvents() {
    const button = document.getElementById("purchase-button");
    if (button) {
      button.addEventListener("click", () => this.processLottoPurchase());
    }
  }

  setupFormEvents() {
    const form = document.getElementById("price-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.processLottoPurchase();
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
