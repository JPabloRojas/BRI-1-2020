import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { Environment } from 'model-environment';

export const actionProps = actionsObj => dispatch => ({
  actions: bindActionCreators(actionsObj, dispatch),
  dispatch,
});

const getState = statePortion => {
  const splitedState = statePortion.split('.');

  return state => {
    let tempState = state;

    if (/\./.test(statePortion)) {
      splitedState.forEach(value => {
        tempState = tempState[value];
      });
    } else {
      tempState = tempState[statePortion];
    }

    return tempState;
  };
};

const getSelectors = (key, valueState, state) => ({
  [key]: createSelector([getState(valueState)], reselectState => reselectState)(state),
});

export const selectState = (...statePortion) => state =>
  statePortion.reduce((prev, current) => {
    const stateName = current.split('.').pop();
    return Object.assign({}, prev, getSelectors(stateName, current, state));
  }, {});
