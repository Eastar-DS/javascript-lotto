import Component from "../../../core/component.js";
import { styleStr } from "../../../helper/style.js";

class Text extends Component {
  initState() {
    this.state = {
      content: "",
    };
  }

  setDefaultProps() {
    this.props = {
      content: "",
      classList: [],
      styles: {},
      key: "init",
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const { content, classList, styles } = this.props;

      return `
      <p 
        class="${classList.join(" ")}" 
        style="${styleStr(styles)}">
        ${content}
      </p>
    `;
    };
  }

  setEvent() {}

  render(props) {
    if (props) this.setProps(props);

    const templateFn = this.template(this.props);
    const html = templateFn();

    return html;
  }
}

export default Text;
