import Text from "../../common/Text/Text.js";
import PriceForm from "../PriceForm/PriceForm.js";
import LottoMachine from "../LottoMachine/LottoMachine.js";
import NumberForm from "../NumberForm/NumberForm.js";
import { LottoMachine as LottoMachineDomain } from "../../../../src/domain/LottoMachine.js";
import Modal from "../../common/Modal/Modal.js";
import LottoResultBox from "../LottoResultBox/LottoResultBox.js";
import Component from "../../../core/component.js";
import { LottoResult as LottoResultDomain } from "../../../../src/domain/LottoResult.js";

export default class LottoShop extends Component {
  constructor() {
    super();
    this.initState();
    this.setDefaultProps();
  }

  initState() {
    this.state = {
      lottoCount: 0,
      lottoNumbers: [],
      showMachineResult: false,
      showWinningNumberSection: false,
      winningNumbers: [],
      bonusNumber: 0,
      lottoResult: {},
      lottoRate: 0,
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "footer-container",
      content: null,
    };
  }

  handlePurchase({ count, numbers }) {
    this.setState({
      lottoCount: count,
      lottoNumbers: numbers,
      showMachineResult: true,
      showWinningNumberSection: true,
    });
  }

  handleWinningNumberSubmit({ winningNumbers, bonusNumber }) {
    this.setState({
      winningNumbers,
      bonusNumber,
    });

    this.calculateLottoResult(winningNumbers, bonusNumber);
    this.showResultModal();
  }

  calculateLottoResult(winningNumbers, bonusNumber) {
    const lottoMachine = new LottoMachineDomain(this.state.lottoNumbers);

    const lottoStatus = lottoMachine.getMatchedLottoStatus(
      winningNumbers.getLottoNumbers(),
      bonusNumber.getValue()
    );

    const totalLottoResult = new LottoResultDomain(
      lottoStatus,
      this.state.lottoCount
    );

    this.setState({
      lottoResult: totalLottoResult.getWinningHistory(),
      lottoRate: totalLottoResult.getRate(),
    });
  }

  showResultModal() {
    const resultBox = new LottoResultBox();
    resultBox.setProps({
      lottoResult: this.state.lottoResult,
      lottoRate: this.state.lottoRate,
    });

    const modal = new Modal();
    modal.setProps({
      title: "🏆 당첨 통계 🏆",
      content: resultBox,
      isModalShow: true,
      key: "result-modal",
    });
    modal.open();
  }

  renderTitle() {
    const titleText = this.addChild(Text);
    return titleText.render({
      content: "🎱 내 번호 당첨 확인 🎱",
      classList: [
        "flex",
        "items-center",
        "justify-center",
        "text-xl",
        "font-bold",
        "px20-py0",
      ],
      key: "lotto-shop-title",
    });
  }

  renderLottoMachine(count) {
    const lottoMachine = this.addChild(LottoMachine);
    return lottoMachine.render({
      count,
      numbers: this.state.lottoNumbers,
    });
  }

  renderWinningNumberSection() {
    return `
      <div class="w-full mt-20">
        ${this.addChild(Text).render({
          content: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
          classList: ["flex", "justify-start", "text-lg", "font-regular"],
          styles: { padding: "12px 0px" },
        })}
        ${this.addChild(NumberForm).render({
          onSubmit: this.handleWinningNumberSubmit.bind(this),
        })}
      </div>
    `;
  }

  renderPriceForm() {
    return this.addChild(PriceForm).render({
      onPurchase: this.handlePurchase.bind(this),
    });
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      return `
      <main class="main flex w-full justify-center items-center bg-gray" id="lotto-shop" style="height: calc(100vh - 80px - 64px);">
        <div class="w-full max-w-414 flex flex-col justify-center items-center rounded-sm px32-py15" style=" border: 1px solid rgba(0, 0, 0, 0.12);">
          ${this.renderTitle()}
          <div id="price-form" class="w-full">
            ${this.renderPriceForm()}
          </div>
          ${
            this.state.showMachineResult
              ? this.renderLottoMachine(this.state.lottoCount)
              : ""
          }
          ${
            this.state.showWinningNumberSection
              ? this.renderWinningNumberSection()
              : ""
          }
        </div>
      </main>
      `;
    };
  }

  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);

    const container = document.getElementById(this.props.containerId);
    if (container) {
      container.innerHTML = html;
      this.componentDidMount();
    }

    return html;
  }

  mount(containerId) {
    if (containerId) {
      this.setProps({ containerId });
    }

    this.render();
  }
}
