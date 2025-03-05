import readLineAsync from "../../util/readLineAsync.js";
import OutputView from "./OutputView.js";

const InputHandler = async ({ inputMessage, parser, validator }) => {
  try {
    const input = await readLineAsync(inputMessage);
    const parsedInput = parser ? parser(input) : input;
    validator(parsedInput);
    return parsedInput;
  } catch (error) {
    OutputView.printError(error);
    return InputHandler({ inputMessage, parser, validator });
  }
};

export default InputHandler;
