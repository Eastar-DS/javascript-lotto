import { createElement } from "../../../utils/dom/createElement.js";
import { CloseButton } from "./ClosButton.js";
import { Title } from "./Title.js";

export const Header = () => {
  const header = createElement("div", { className: "modal-header" });

  header.append(CloseButton(), Title());

  return header;
};
