import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TOPICS_FETCH_TOPIC_BEGIN,
  TOPICS_FETCH_TOPIC_SUCCESS,
  TOPICS_FETCH_TOPIC_FAILURE,
  TOPICS_FETCH_TOPIC_DISMISS_ERROR,
} from '../../../../src/features/topics/redux/constants';

import {
  fetchTopic,
  dismissFetchTopicError,
  reducer,
} from '../../../../src/features/topics/redux/fetchTopic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics/redux/fetchTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchTopic succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchTopic())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_FETCH_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_FETCH_TOPIC_SUCCESS);
      });
  });

  it('dispatches failure action when fetchTopic fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchTopic({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_FETCH_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_FETCH_TOPIC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchTopicError', () => {
    const expectedAction = {
      type: TOPICS_FETCH_TOPIC_DISMISS_ERROR,
    };
    expect(dismissFetchTopicError()).toEqual(expectedAction);
  });

  it('handles action type TOPICS_FETCH_TOPIC_BEGIN correctly', () => {
    const prevState = { fetchTopicPending: false };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPIC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicPending).toBe(true);
  });

  it('handles action type TOPICS_FETCH_TOPIC_SUCCESS correctly', () => {
    const prevState = { fetchTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPIC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicPending).toBe(false);
  });

  it('handles action type TOPICS_FETCH_TOPIC_FAILURE correctly', () => {
    const prevState = { fetchTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicPending).toBe(false);
    expect(state.fetchTopicError).toEqual(expect.anything());
  });

  it('handles action type TOPICS_FETCH_TOPIC_DISMISS_ERROR correctly', () => {
    const prevState = { fetchTopicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPIC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicError).toBe(null);
  });
});

