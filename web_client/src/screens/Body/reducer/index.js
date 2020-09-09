/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createAction, createReducer } from 'utils/reducer';
import { flatObject } from 'utils/functions';

// Local constants
const PATH = 'body/';
const CONTROLS_CHANGED = `${PATH}CONTROLS_CHANGED`;

// Global constants for saga
export const BODY = {
  GET_SYMPTOMS: `${PATH}GET_SYMPTOMS`,
  GET_SYMPTOMS_SUCCESS: `${PATH}GET_SYMPTOMS_SUCCESS`,
};

// actions
export const bodyActions = {
  controlsChanged: createAction(CONTROLS_CHANGED, 'controls'),

  getSymptoms: createAction(BODY.GET_SYMPTOMS),
  getSymptomsSuccess: createAction(BODY.GET_SYMPTOMS_SUCCESS, 'symptoms'),
};

const initialState = {
  controls: {},
  symptoms: [],
};

const body = createReducer(initialState, {
  [CONTROLS_CHANGED](state, action) {
    state.controls = {
      ...state.controls,
      ...action.controls,
    };
  },
  [BODY.GET_SYMPTOMS_SUCCESS](state, action) {
    state.symptoms = flatObject(action.symptoms);
  },
});

export default body;
