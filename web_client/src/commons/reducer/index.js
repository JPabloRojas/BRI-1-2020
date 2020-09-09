/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createReducer, createAction } from 'utils/reducer';
import { normalizeObj } from 'utils/functions';

// GLOBAL
export const GET_STATE_FROM_API = 'app/GET_API_FROM_STATE';
export const GET_STATE_FROM_API_SUCCESS = 'app/GET_API_FROM_STATE_SUCCESS';
export const LOG_OUT = 'app/LOG_OUT';
export const TOGGLE_DRAWER = 'app/TOGGLE_DRAWER';
export const TOGGLE_ERROR = 'app/TOGGLE_ERROR';
export const TOGGLE_SUCCESS = 'app/TOGGLE_SUCCESS';
export const SET_ERROR = 'app/SET_ERROR';
export const SET_SUCCESS = 'app/SET_SUCCESS';
export const SET_LOADER = 'app/SET_LOADER';

export const appActions = {
  // api fetch
  logOut: createAction(LOG_OUT),
  // others
  toggleError: createAction(TOGGLE_ERROR),
  toggleSuccess: createAction(TOGGLE_SUCCESS),
  toggleDrawer: createAction(TOGGLE_DRAWER),
  setError: createAction(SET_ERROR, 'msg'),
  setSuccess: createAction(SET_SUCCESS, 'msg'),
  setLoader: createAction(SET_LOADER, 'id', 'state'),
};

const initialState = {
  drawerIsOpen: false,
  loadingUser: true,
  errorMsg: '',
  error: false,
  successMsg: '',
  success: false,
  objects: {
    clients: {},
  },
  user: {},
  loaders: {},
};

const mergeObjects = (state, action) => {
  const newObjects = {};
  Object.keys({ ...state.objects, ...action.payload.objects }).forEach(key => {
    newObjects[key] = {
      ...state.objects[key],
      ...(action.payload.objects[key] || {})
    };
  });
  state.objects = newObjects;
};

const deleteObject = (state, action) => {
  state.objects[action.payload.type] = normalizeObj(Object.values(state.objects[action.payload.type]).filter(item => item.id !== action.payload.item.id));
};

const app = createReducer(initialState, {
  // success
  // [PRODUCTS.GET_STATE_FROM_API_SUCCESS]: mergeObjects,
  // [PRODUCTS.CREATE_PRODUCT_SUCCESS]: mergeObjects,
  // [PRODUCTS.EDIT_PRODUCT_SUCCESS]: mergeObjects,
  // [PRODUCTS.DELETE_PRODUCT_SUCCESS]: deleteObject,
  // [PURCHASES.EDIT_PURCHASE_SUCCESS](state, action) {
  //   mergeObjects(state, action);
  //   action.payload.deletedServiceLineIds.forEach(id => {
  //     deleteObject(state, { payload: { type: 'serviceLines', item: { id }}});
  //   });
  // },
  // others
  [LOG_OUT](state, action) {
    state.user = {};
  },
  [TOGGLE_DRAWER](state, action) {
    state.drawerIsOpen = !state.drawerIsOpen;
  },
  [TOGGLE_ERROR](state, action) {
    state.error = false;
    state.errorMsg = !state.errorMsg;
  },
  [SET_ERROR](state, action) {
    state.error = true;
    state.errorMsg = action.msg;
  },
  [TOGGLE_SUCCESS](state, action) {
    state.success = false;
    state.successMsg = !state.successMsg;
  },
  [SET_SUCCESS](state, action) {
    state.success = true;
    state.successMsg = action.msg;
  },
  [SET_LOADER](state, action) {
    state.loaders[action.id] = action.state;
  },
});

export default app;
