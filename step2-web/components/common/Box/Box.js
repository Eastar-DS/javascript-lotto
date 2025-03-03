import Component from "../../../core/component.js";
import { styleStr } from "../../../helper/style.js";

class Box extends Component {
  setDefaultProps() {
    this.props = {
      classList: [],
      styles: {},
      children: [],
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const { classList, styles, children } = this.props;
      const childrenArray = Array.isArray(children) ? children : [children];

      const sanitizedChildren = childrenArray
        .filter((child) => child != null)
        .map((child) => String(child));

      return `
      <div 
        class="box w-full box-border rounded-sm bg-white max-w-414 ${classList.join(
          " "
        )}"
        style="${styleStr(styles)}"
      >
        ${sanitizedChildren.join("")}
      </div>
    `;
    };
  }
}

export default Box;
