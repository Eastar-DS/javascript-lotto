import Component from "../../../core/component.js";
import { styleStr } from "../../../helper/style.js";
import Text from "../Text/Text.js";

class Modal extends Component {
  constructor() {
    super();
    this.setDefaultProps();
  }

  setDefaultProps() {
    this.props = {
      title: "",
      content: null,
      width: 414,
      padding: 20,
      isModalShow: false,
      key: "modal",
    };
  }

  template() {
    const titleText = this.addChild(Text);

    return (props) => {
      if (props) this.setProps(props);

      const { title, content, isModalShow, key } = this.props;

      const modalStyle = {
        display: isModalShow ? "flex" : "none",
      };

      const titleTextProps = {
        content: title,
        classList: [
          "flex",
          "items-center",
          "justify-center",
          "text-xl",
          "font-semibold",
          "px20-py0",
        ],
      };

      const renderedTitleText = titleText.render(titleTextProps);
      const contentHtml = this.renderContent();

      return `
      <div class="modal-container w-full h-full fixed justify-center items-center" id="${key}" style="${styleStr(
        modalStyle
      )}">
        <div class="modal max-w-350 relative rounded-lg bg-white px32-py15">
          <div 
            class="close-button black absolute cursor-pointer text-xl" 
            style="top: 10px; right: 10px; padding: 5px;"
            >
              X
            </div>
          ${renderedTitleText}
          <div class="modal-content flex justify-center items-center" style="padding: 20px;">
            ${contentHtml}
          </div>
        </div>
      </div>
    `;
    };
  }

  setEvent() {
    const { key } = this.props;
    const modalContainer = document.getElementById(key);
    if (!modalContainer) return;

    const closeButton = modalContainer.querySelector(".close-button");
    const modalBody = modalContainer.querySelector(".modal");

    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && this.close()
    );
    closeButton.addEventListener("click", () => this.close());
    modalBody.addEventListener("click", (e) => e.stopPropagation());
    modalContainer.addEventListener(
      "click",
      (e) => e.target === modalContainer && this.close()
    );

    if (
      this.props.content &&
      typeof this.props.content.setEvent === "function"
    ) {
      this.props.content.setEvent();
    }
  }

  open() {
    const modalHTML = this.render();

    const existingModals = document.querySelectorAll(".modal-container");
    existingModals.forEach((modal) => {
      modal.remove();
    });

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modalContainer = document.getElementById(this.props.key);
    if (modalContainer) {
      modalContainer.style.display = "flex";
      this.setEvent();
    }
  }

  close() {
    this.setProps({ isModalShow: false });

    const modalContainer = document.getElementById(this.props.key);
    if (modalContainer) {
      modalContainer.remove();
    }
  }

  renderContent() {
    const { content } = this.props;

    if (!content) return "";

    if (typeof content === "string") {
      return content;
    }

    if (typeof content.render === "function") {
      return content.render();
    }

    if (typeof content === "object") {
      return `<pre>${JSON.stringify(content, null, 2)}</pre>`;
    }

    return String(content);
  }

  render() {
    const templateFn = this.template();
    const html = templateFn(this.props);
    return html;
  }
}

export default Modal;
