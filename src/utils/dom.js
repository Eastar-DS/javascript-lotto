const isSvgTag = (tag) => tag === "svg" || tag === "path";

export const createElement = (tag, props = {}) => {
  if (!tag || typeof tag !== "string") {
    throw new Error("태그는 문자열이어야 합니다.");
  }
  const element = isSvgTag(tag)
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === "style" && typeof value === "object") {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        element.style.setProperty(styleKey, styleValue);
      });
    }

    // class
    if (key === "class") {
      if (Array.isArray(value)) {
        element.classList.add(...value);
        return;
      }

      element.classList.add(value);
      return;
    }

    // attribute
    if (isSvgTag(tag)) {
      element.setAttribute(key, value);
      return;
    }

    element[key] = value;
  });

  return element;
};

export const createElementsFragment = (elements) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...elements);
  return fragment;
};
