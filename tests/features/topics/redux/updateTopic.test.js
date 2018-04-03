import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TOPICS_UPDATE_TOPIC_BEGIN,
  TOPICS_UPDATE_TOPIC_SUCCESS,
  TOPICS_UPDATE_TOPIC_FAILURE,
  TOPICS_UPDATE_TOPIC_DISMISS_ERROR,
} from '../../../../src/features/topics/redux/constants';

import {
  updateTopic,
  dismissUpdateTopicError,
  reducer,
} from '../../../../src/features/topics/redux/updateTopic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics/redux/updateTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateTopic succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateTopic())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_UPDATE_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_UPDATE_TOPIC_SUCCESS);
      });
  });

  it('dispatches failure action when updateTopic fails', () => {
    const store = mockStore({});

    return store.dispatch(updateTopic({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_UPDATE_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_UPDATE_TOPIC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateTopicError', () => {
    const expectedAction = {
      type: TOPICS_UPDATE_TOPIC_DISMISS_ERROR,
    };
    expect(dismissUpdateTopicError()).toEqual(expectedAction);
  });

  it('handles action type TOPICS_UPDATE_TOPIC_BEGIN correctly', () => {
    const prevState = { updateTopicPending: false };
    const state = reducer(
      prevState,
      { type: TOPICS_UPDATE_TOPIC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateTopicPending).toBe(true);
  });

  it('handles action type TOPICS_UPDATE_TOPIC_SUCCESS correctly', () => {
    const prevState = { updateTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_UPDATE_TOPIC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateTopicPending).toBe(false);
  });

  it('handles action type TOPICS_UPDATE_TOPIC_FAILURE correctly', () => {
    const prevState = { updateTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_UPDATE_TOPIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateTopicPending).toBe(false);
    expect(state.updateTopicError).toEqual(expect.anything());
  });

  it('handles action type TOPICS_UPDATE_TOPIC_DISMISS_ERROR correctly', () => {
    const prevState = { updateTopicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TOPICS_UPDATE_TOPIC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateTopicError).toBe(null);
  });
});

