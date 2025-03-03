import Component from "../../../core/component.js";
export default class Footer extends Component {
  initState() {
    this.state = {
      content: "Copyright 2023. woowacourse",
    };
  }

  setDefaultProps() {
    this.props = {
      containerId: "footer-container",
      content: null,
    };
  }

  template() {
    return (props) => {
      if (props) {
        this.setProps({ content: props.content });
      }

      return `
        <footer 
          class="footer w-full fixed flex justify-center items-center bg-gray" 
          style="bottom: 0; left: 0; height: 80px; border-top: 1px solid rgba(0, 0, 0, 0.12);"
        >
          <p class="flex justify-center items-center text-md font-bold primary">
            ${this.state.content}
          </p>
        </footer>
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
      this.componentDidMount();
    }

    return html;
  }
}
