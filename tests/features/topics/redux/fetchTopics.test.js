import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TOPICS_FETCH_TOPICS_BEGIN,
  TOPICS_FETCH_TOPICS_SUCCESS,
  TOPICS_FETCH_TOPICS_FAILURE,
  TOPICS_FETCH_TOPICS_DISMISS_ERROR,
} from '../../../../src/features/topics/redux/constants';

import {
  fetchTopics,
  dismissFetchTopicsError,
  reducer,
} from '../../../../src/features/topics/redux/fetchTopics';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics/redux/fetchTopics', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchTopics succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchTopics())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_FETCH_TOPICS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_FETCH_TOPICS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchTopics fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchTopics({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_FETCH_TOPICS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_FETCH_TOPICS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchTopicsError', () => {
    const expectedAction = {
      type: TOPICS_FETCH_TOPICS_DISMISS_ERROR,
    };
    expect(dismissFetchTopicsError()).toEqual(expectedAction);
  });

  it('handles action type TOPICS_FETCH_TOPICS_BEGIN correctly', () => {
    const prevState = { fetchTopicsPending: false };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPICS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicsPending).toBe(true);
  });

  it('handles action type TOPICS_FETCH_TOPICS_SUCCESS correctly', () => {
    const prevState = { fetchTopicsPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPICS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicsPending).toBe(false);
  });

  it('handles action type TOPICS_FETCH_TOPICS_FAILURE correctly', () => {
    const prevState = { fetchTopicsPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPICS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicsPending).toBe(false);
    expect(state.fetchTopicsError).toEqual(expect.anything());
  });

  it('handles action type TOPICS_FETCH_TOPICS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchTopicsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TOPICS_FETCH_TOPICS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchTopicsError).toBe(null);
  });
});

