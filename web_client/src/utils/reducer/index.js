import produce, { setAutoFreeze } from 'immer';

setAutoFreeze(process.env.NODE_ENV !== 'production');

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) => {
    const actionHandler = handlers[action.type];

    return actionHandler
      ? produce(state, draftState =>
        actionHandler(draftState, action))
      : state;
  };

export const createAction = (type, ...argNames) =>
  (...args) => {
    const action = {
      type,
    };

    return argNames.reduce((prevValue, currentValue, index) => {
      // eslint-disable-next-line no-param-reassign
      prevValue[currentValue] = args[index];
      return prevValue;
    }, action);
  };
