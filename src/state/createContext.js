import { isFunction } from "../utils/predicate.js";

const createContext = (initialState = null) => {
  const context = {
    memoizedState: null,
    baseState: null,
  };

  context.memoizedState = context.baseState = isFunction(initialState)
    ? initialState()
    : initialState;

  return context;
};

export default createContext;
