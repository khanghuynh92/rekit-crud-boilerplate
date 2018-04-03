import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TOPICS_DELETE_TOPIC_BEGIN,
  TOPICS_DELETE_TOPIC_SUCCESS,
  TOPICS_DELETE_TOPIC_FAILURE,
  TOPICS_DELETE_TOPIC_DISMISS_ERROR,
} from '../../../../src/features/topics/redux/constants';

import {
  deleteTopic,
  dismissDeleteTopicError,
  reducer,
} from '../../../../src/features/topics/redux/deleteTopic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics/redux/deleteTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteTopic succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteTopic())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_DELETE_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_DELETE_TOPIC_SUCCESS);
      });
  });

  it('dispatches failure action when deleteTopic fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteTopic({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_DELETE_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_DELETE_TOPIC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteTopicError', () => {
    const expectedAction = {
      type: TOPICS_DELETE_TOPIC_DISMISS_ERROR,
    };
    expect(dismissDeleteTopicError()).toEqual(expectedAction);
  });

  it('handles action type TOPICS_DELETE_TOPIC_BEGIN correctly', () => {
    const prevState = { deleteTopicPending: false };
    const state = reducer(
      prevState,
      { type: TOPICS_DELETE_TOPIC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteTopicPending).toBe(true);
  });

  it('handles action type TOPICS_DELETE_TOPIC_SUCCESS correctly', () => {
    const prevState = { deleteTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_DELETE_TOPIC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteTopicPending).toBe(false);
  });

  it('handles action type TOPICS_DELETE_TOPIC_FAILURE correctly', () => {
    const prevState = { deleteTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_DELETE_TOPIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteTopicPending).toBe(false);
    expect(state.deleteTopicError).toEqual(expect.anything());
  });

  it('handles action type TOPICS_DELETE_TOPIC_DISMISS_ERROR correctly', () => {
    const prevState = { deleteTopicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TOPICS_DELETE_TOPIC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteTopicError).toBe(null);
  });
});

