import Component from "../../../core/component.js";
import { styleStr } from "../../../helper/style.js";

class Input extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }

  setDefaultProps() {
    this.props = {
      placeholder: "",
      type: "text",
      value: "",
      onChange: () => {},
      classList: [],
      styles: {},
      id: "",
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const { placeholder, type, value, id, styles, classList } = this.props;

      return `
      <input
        id="${id}"
        type="${type}"
        placeholder="${placeholder}"
        value="${value}"
        class="${classList.join(
          " "
        )} input w-full h-36 box-border flex items-center justify-center rounded-sm text-lg p-8"
        style="${styleStr(styles)} border: 1px solid var(--gray-400);"
      />
    `;
    };
  }

  setEvent() {
    const { onChange, id } = this.props;
    const inputElement = document.getElementById(id);

    if (!inputElement) return;

    inputElement.addEventListener("input", (e) => {
      onChange(e.target.value);
    });
  }

  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    const html = templateFn(this.props);

    return html;
  }
}

export default Input;
