import {
  takeLatest,
  spawn,
  put,
} from 'redux-saga/effects';

import apiRequest from 'utils/api';
import { LOG_OUT, appActions } from 'commons/reducer';

const VENDOR_ID = 2655;

function* logout() {
  yield takeLatest(LOG_OUT, function* () {
    yield apiRequest('/logout', { method: 'get' });
  });
}


export default function* root() {
  yield spawn(logout);
}
