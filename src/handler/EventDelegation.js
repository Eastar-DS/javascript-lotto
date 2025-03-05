class EventDelegation {
  constructor({ rootElement, actions, eventType }) {
    this.rootElement = rootElement;
    this.actions = actions;

    this.rootElement.addEventListener(eventType, (event) =>
      this.handleEvent(event)
    );
  }

  handleEvent(event) {
    const targetElement = event.target.closest("[id]");

    if (targetElement && this.actions[targetElement.id]) {
      this.actions[targetElement.id](event);
    }
  }
}

export default EventDelegation;
