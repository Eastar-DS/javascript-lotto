import Component from "../../../core/component.js";
import { styleStr } from "../../../helper/style.js";

class Button extends Component {
  constructor() {
    super();
  }

  setDefaultProps() {
    this.props = {
      content: "",
      onClick: () => {},
      styles: {},
      classList: [],
      id: "",
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const { content, classList, id, styles } = this.props;

      return `
      <button 
        id="${id}"  
        type="submit"
        class="${classList.join(
          " "
        )} button h-36 flex justify-center items-center text-md font-semibold rounded-sm white bg-primary cursor-pointer" 
        style="${styleStr(
          styles
        )} padding: 0 16px; border: none; white-space: nowrap;"
      >
        ${content}
      </button>
    `;
    };
  }

  setEvent() {
    const { onClick, id } = this.props;
    const button = document.getElementById(id);
    if (typeof onClick === "function") {
      button.addEventListener("click", (event) => {
        onClick(event);
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

export default Button;
