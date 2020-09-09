import { truthty } from 'utils/functions';

// @ts-nocheck
export const apiSuccess = (entity, payload) => ({
  type: entity,
  payload,
});

const defaultHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function* apiRequest(url, options = defaultHeader) {
  const res = yield fetch(`http://localhost:5000${url}`, {
    ...defaultHeader,
    ...options,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        localStorage.clear();
        window.location.replace(window.location.origin);
      } else {
        return response.text().then(errorMsg => ({ error: true, errorMsg }));
      }
    })
    .catch(response => {
      console.error(response);
    });
  return res;
}

export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map(k => {
      if (truthty(obj[k])) {
        return Array.isArray(obj[k])
          ? obj[k].map(o => `${encodeURIComponent(k)}[]=${encodeURIComponent(o)}`).join('&')
          : `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
      } else {
        return '';
      }
    })
    .join('&');
}

export function* post(path, body) {
  const options = {
    method: 'post',
    body: JSON.stringify(body),
  };

  return yield apiRequest(path, options);
}

export function* update(path, body) {
  const options = {
    method: 'put',
    body: JSON.stringify(body),
  };

  return yield apiRequest(path, options);
}

export function* destroy(path, query) {
  const options = {
    method: 'delete',
  };
  return yield apiRequest(`${path}?${query}`, options);
}

export function* get(path, query) {
  const options = {
    method: 'get',
  };
  return yield apiRequest(`${path}?${query}`, options);
}
