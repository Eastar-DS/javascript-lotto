import WebController from "./controller/WebController.js";
import ClickEventHandler from "./handler/ClickEventHandler.js";
import InputEventHandler from "./handler/InputEventHandler.js";

const controller = new WebController();

new ClickEventHandler(controller);
new InputEventHandler();
controller.init();
