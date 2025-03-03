import Header from "../step2-web/components/feature/Header/Header.js";
import LottoShop from "../step2-web/components/feature/LottoShop/LottoShop.js";
import Footer from "../step2-web/components/feature/Footer/Footer.js";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = new Header();
  const lottoShop = new LottoShop();
  const footer = new Footer();

  header.mount("header-container");
  lottoShop.mount("lotto-shop-container");
  footer.mount("footer-container");
});
