import axios from 'axios';

import {
  TOPICS_FETCH_TOPIC_BEGIN,
  TOPICS_FETCH_TOPIC_SUCCESS,
  TOPICS_FETCH_TOPIC_FAILURE,
  TOPICS_FETCH_TOPIC_DISMISS_ERROR,
} from './constants';

import { API_URL } from './../../../config';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchTopic({ id }) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: TOPICS_FETCH_TOPIC_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.

      axios.get(`${API_URL}/topics/${id}`).then(
        (res) => {
          dispatch({
            type: TOPICS_FETCH_TOPIC_SUCCESS,
            data: res.data,
          });
          resolve(res.data);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TOPICS_FETCH_TOPIC_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchTopicError() {
  return {
    type: TOPICS_FETCH_TOPIC_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TOPICS_FETCH_TOPIC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchTopicPending: true,
        fetchTopicError: null,
      };

    case TOPICS_FETCH_TOPIC_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchTopicPending: false,
        fetchTopicError: null,
      };

    case TOPICS_FETCH_TOPIC_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchTopicPending: false,
        fetchTopicError: action.data.error,
      };

    case TOPICS_FETCH_TOPIC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchTopicError: null,
      };

    default:
      return state;
  }
}
