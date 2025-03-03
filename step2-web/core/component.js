export default class Component {
  props;
  state;
  children = [];

  constructor(props) {
    this.props = props;
    this.children = [];
    this.initState();
    this.setDefaultProps();
  }

  initState() {
    this.state = {};
  }

  addChild(C, ...args) {
    const component = new C(...args);
    this.children.push(component);
    return component;
  }

  template() {
    return () => "";
  }

  setEvent() {}

  setDefaultProps() {
    this.props = {};
  }

  setProps(newProps) {
    this.props = {
      ...this.props,
      ...newProps,
    };
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }

  componentDidMount() {
    this.children.forEach((child) => {
      if (typeof child.setEvent === "function") {
        child.setEvent();
      }
    });
  }

  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }

  mount(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.render();
      this.componentDidMount();
    }
  }
}
