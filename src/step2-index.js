/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { $ } from "./utils/dom/selectors.js";
import initializeEventListeners from "./controller/WebController.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = $("#app");
  window.initialAppState = appContainer.cloneNode(true);

  initializeEventListeners();
});
