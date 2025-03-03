import { isFunction } from "../utils/predicate.js";

const createState = (initialState = null) => {
  const state = {
    memoizedState: null,
    baseState: null,
  };

  state.memoizedState = state.baseState = isFunction(initialState)
    ? initialState()
    : initialState;

  const getState = () => state.memoizedState;

  const setState = (value) => {
    const newState = isFunction(value) ? value(state.baseState) : value;

    if (Object.is(newState, state.baseState)) {
      return;
    }

    state.memoizedState = state.baseState = newState;
  };

  return [getState, setState];
};

export default createState;
