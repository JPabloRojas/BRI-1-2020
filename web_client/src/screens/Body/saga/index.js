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

export default function* saga() {
  yield spawn(getSymptoms);
}
