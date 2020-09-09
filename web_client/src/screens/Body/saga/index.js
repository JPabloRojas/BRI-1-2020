// @ts-nocheck
/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
import { takeLatest, spawn, put } from 'redux-saga/effects';

import apiRequest, { apiSuccess } from 'utils/api';
import { BODY, bodyActions } from '../reducer';

function* getSymptoms() {
  yield takeLatest(BODY.GET_SYMPTOMS, function* (action) {
    const response = yield apiRequest(`/symptoms`, {
      method: 'get',
    });
    if (response) {
      yield put(bodyActions.getSymptomsSuccess(response));
    }
  });
}

function* getResults() {
  yield takeLatest(BODY.GET_RESULTS, function* (action) {
    const response = yield apiRequest(`/query`, {
      method: 'post',
      body: JSON.stringify({
        query: action.symptoms,
      }),
    });
    if (response) {
      yield put(bodyActions.getResultsSuccess(response));
    }
  });
}

export default function* saga() {
  yield spawn(getSymptoms);
  yield spawn(getResults);
}
