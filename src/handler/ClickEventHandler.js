import EventDelegation from "./EventDelegation.js";

class ClickEventHandler {
  constructor(controller) {
    this.controller = controller;

    new EventDelegation({
      rootElement: document.body,
      actions: {
        purchaseButton: this.controller.handlePurchase.bind(this.controller),
        resultButton: this.controller.handleResult.bind(this.controller),
        modalRestartButton: this.controller.handleRestart.bind(this.controller),
        modalCloseButton: this.controller.handleCloseModal.bind(
          this.controller
        ),
        modalBackdrop: this.controller.handleCloseModal.bind(this.controller),
      },
      eventType: "click",
    });
  }
}

export default ClickEventHandler;
