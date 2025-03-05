import EventDelegation from "./EventDelegation";

class InputEventHandler {
  NUMBER_MAX_LENGTH = 2;

  constructor() {
    new EventDelegation({
      rootElement: document.body,
      actions: {
        ...this.#generateWinningNumberActions(),
        bonusNumberInput: this.#limitInputLength.bind(this),
      },
      eventType: "input",
    });
  }

  #generateWinningNumberActions() {
    return Array.from(
      { length: 6 },
      (_, index) => `winningNumberInput${index}`
    ).reduce((actions, id) => {
      actions[id] = this.#limitInputLength.bind(this);
      return actions;
    }, {});
  }

  #limitInputLength(event) {
    if (event.target.value.length > this.NUMBER_MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, this.NUMBER_MAX_LENGTH);
    }
  }
}

export default InputEventHandler;
