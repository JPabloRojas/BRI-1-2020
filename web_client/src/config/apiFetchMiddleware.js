/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { clone } from 'utils/functions';

export default function apiFetchMiddleware(store) {
  return next =>
    action => {
      let act = action;

      if (!/(persist)/i.test(action.type) && /FETCH/.test(action.type)) {
        act = clone(clone.OBJECT, action);
        act.type = `${action.type}_SUCCESS`;
      }
      next(act);
    };
}
