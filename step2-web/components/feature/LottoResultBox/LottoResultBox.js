import Component from "../../../core/component.js";
import { LottoMachine as LottoMachineDomain } from "../../../../src/domain/LottoMachine.js";
import Text from "../../common/Text/Text.js";
import Table from "../../common/Table/Table.js";
import Button from "../../common/Button/Button.js";

const HEADER = ["일치 갯수", "당첨금", "당첨 갯수"];
export default class LottoResultBox extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }

  setDefaultProps() {
    this.props = {
      lottoResult: null,
      lottoRate: 0,
    };
  }

  renderTable() {
    const resultTable = this.addChild(Table);
    const data = LottoMachineDomain.LOTTO_STATUS.map(
      ({ RANK, COUNT, REWORD, IS_BONUS }) => {
        return [
          IS_BONUS ? `${COUNT}개+보너스볼` : `${COUNT}개`,
          REWORD.toLocaleString("ko-KR"),
          `${this.props.lottoResult[RANK] || 0}개`,
        ];
      }
    ).reverse();

    return resultTable.render({ headers: HEADER, data });
  }

  renderProfitText() {
    const profitText = this.addChild(Text);
    return profitText.render({
      content: `당신의 총 수익률은 ${this.props.lottoRate}%입니다.`,
      classList: [
        "w-full",
        "flex",
        "justify-center",
        "items-center",
        "text-lg",
        "font-bold",
        "px32-py15",
      ],
    });
  }

  renderRestartButton() {
    const restartButton = this.addChild(Button);
    return restartButton.render({
      content: "다시 시작하기",
      onClick: () => {
        window.location.reload();
      },
      classList: ["block", "w-full"],
      styles: { padding: "10px", marginTop: "20px" },
      id: "restart-button",
    });
  }

  handleRestartClick() {
    console.log("handleRestartClick");
    window.location.reload();
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      return `
        <div class="lotto-result-box flex flex-col w-full">
          ${this.renderTable()}
          ${this.renderProfitText()}
          ${this.renderRestartButton()}
        </div>
      `;
    };
  }

  setEvent() {
    const restartButton = document.getElementById("restart-button");

    if (restartButton) {
      restartButton.addEventListener("click", () => {
        this.handleRestartClick();
      });
    }
  }

  componentDidMount() {
    this.setEvent();
  }

  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);
    this.componentDidMount();
    return html;
  }
}
