import Component from "../../../core/component.js";

export default class Header extends Component {
  initState() {
    this.state = {
      title: "🎱 행운의 로또",
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "header-container",
      title: null,
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps({ title: props.title });

      const title = props && props.title ? props.title : this.state.title;

      return `
        <header 
          class="header w-full box-border flex items-center primary bg-primary"
          style="height: 64px; padding: 0 0 0 30px;"
          >
          <span class="text-2xl font-extrabold white">${title}</span>
        </header>
      `;
    };
  }

  render(props) {
    if (props) this.setProps(props);

    const templateFn = this.template();
    const html = templateFn();

    const container = document.getElementById(this.props.containerId);
    if (container) {
      container.innerHTML = html;
      this.setEvent();
    }
    return html;
  }
}
