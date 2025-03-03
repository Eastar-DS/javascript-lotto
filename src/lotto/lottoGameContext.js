import { LOTTO_CONTEXT } from "../constants/lotto.js";
import { isFunction } from "../utils/predicate.js";
import createContext from "../state/createContext.js";

const lottoGameContext = () => {
  const context = {
    [LOTTO_CONTEXT.isPurchased]: createContext(false),
  };

  const getContext = (key) => {
    return context[key].memoizedState;
  };

  const setContext = (key, value) => {
    const newState = isFunction(value) ? value(context[key].baseState) : value;

    if (Object.is(newState, context[key].baseState)) {
      return;
    }

    context[key].memoizedState = context[key].baseState = newState;
  };

  return [getContext, setContext];
};

export const [getContext, setContext] = lottoGameContext();
