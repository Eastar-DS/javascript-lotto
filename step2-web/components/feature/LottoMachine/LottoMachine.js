import Component from "../../../core/component.js";
import Text from "../../common/Text/Text.js";

export default class LottoMachine extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }

  setDefaultProps() {
    this.props = {
      count: 0,
      numbers: [],
    };
  }

  renderPurchaseText() {
    const purchaseText = this.addChild(Text);
    return purchaseText.render({
      content: `총 ${this.props.count}개를 구매하였습니다.`,
    });
  }

  renderLottoNumbers() {
    return this.props.numbers
      .map(
        (lotto) => `
        <div>
          🎟️ ${lotto.getLottoNumbers().join(", ")}
        </div>`
      )
      .join("");
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      return `
          <div class="w-full flex items-start justify-start mt-20">
          ${this.renderPurchaseText()}
          </div>
          <div class="w-full flex flex-col items-start justify-start text-lg font-regular mt-20 gap-10" style="max-height: 240px; overflow-y: auto;">
            ${this.renderLottoNumbers()}
          </div>

      `;
    };
  }

  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}
