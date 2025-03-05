const WebInputHandler = ({ elementIds, parser, validator }) => {
  if (typeof elementIds === "string") {
    const input = document.getElementById(elementIds).value;
    const parsedInput = parser ? parser(input) : input;
    validator(parsedInput);
    return parsedInput;
  }
  if (Array.isArray(elementIds)) {
    const inputs = elementIds.map((id) => document.getElementById(id).value);
    const parsedInputs = inputs.map((input) =>
      parser ? parser(input) : input
    );
    validator(parsedInputs);
    return parsedInputs;
  }
};

export default WebInputHandler;
