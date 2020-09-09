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
  GET_RESULTS: `${PATH}GET_RESULTS`,
  GET_RESULTS_SUCCESS: `${PATH}GET_RESULTS_SUCCESS`,
};

// actions
export const bodyActions = {
  controlsChanged: createAction(CONTROLS_CHANGED, 'controls'),

  getSymptoms: createAction(BODY.GET_SYMPTOMS),
  getSymptomsSuccess: createAction(BODY.GET_SYMPTOMS_SUCCESS, 'symptoms'),
  getResults: createAction(BODY.GET_RESULTS, 'symptoms'),
  getResultsSuccess: createAction(BODY.GET_RESULTS_SUCCESS, 'results'),
};

const initialState = {
  controls: {
    loadingResults: false,
  },
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
  [BODY.GET_RESULTS](state) {
    state.controls.loadingResults = true;
  },
  [BODY.GET_RESULTS_SUCCESS](state, action) {
    state.controls.loadingResults = false;
  },
});

export default body;
