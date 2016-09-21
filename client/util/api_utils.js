import { merge } from 'lodash';
import { createNotification } from '../actions/notification_actions.js';
import { startLoading, stopLoading } from '../actions/loading_actions.js';
import 'whatwg-fetch';

export const call = ({ dispatch, request, loading, success, error, prev, preloaded }) => {
  const onSuccess = resp => {
    const successMessage = success && success(resp);
    dispatch(stopLoading(loading[0]));
    if (successMessage) dispatch(createNotification('success', successMessage));
  };

  const onError = e => {
    dispatch(stopLoading(loading[0]));
    Object.keys(e.errors).forEach(key => {
      dispatch(createNotification('error', e.errors[key].message));
    });
    if (error) error(e);
  };


  // Only set loading state if the object has not been previously fetched

  if (!preloaded) {
    !(prev && (Array.isArray(prev) || Object.keys(prev).length)) && dispatch(startLoading(...loading));
    const req = merge(request, {success: onSuccess, error: onError});
    fetch(req.url, {
      method: req.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(req.data)
    }).then(resp => {
      if (!resp.ok) {
        throw resp.json();
      }
       return resp.json();
    }).then(onSuccess).catch(err => err.then(onError));
  }

};
