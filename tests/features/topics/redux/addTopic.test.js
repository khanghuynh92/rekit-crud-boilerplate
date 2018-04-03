import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TOPICS_ADD_TOPIC_BEGIN,
  TOPICS_ADD_TOPIC_SUCCESS,
  TOPICS_ADD_TOPIC_FAILURE,
  TOPICS_ADD_TOPIC_DISMISS_ERROR,
} from '../../../../src/features/topics/redux/constants';

import {
  addTopic,
  dismissAddTopicError,
  reducer,
} from '../../../../src/features/topics/redux/addTopic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics/redux/addTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addTopic succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addTopic())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_ADD_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_ADD_TOPIC_SUCCESS);
      });
  });

  it('dispatches failure action when addTopic fails', () => {
    const store = mockStore({});

    return store.dispatch(addTopic({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOPICS_ADD_TOPIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', TOPICS_ADD_TOPIC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddTopicError', () => {
    const expectedAction = {
      type: TOPICS_ADD_TOPIC_DISMISS_ERROR,
    };
    expect(dismissAddTopicError()).toEqual(expectedAction);
  });

  it('handles action type TOPICS_ADD_TOPIC_BEGIN correctly', () => {
    const prevState = { addTopicPending: false };
    const state = reducer(
      prevState,
      { type: TOPICS_ADD_TOPIC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addTopicPending).toBe(true);
  });

  it('handles action type TOPICS_ADD_TOPIC_SUCCESS correctly', () => {
    const prevState = { addTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_ADD_TOPIC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addTopicPending).toBe(false);
  });

  it('handles action type TOPICS_ADD_TOPIC_FAILURE correctly', () => {
    const prevState = { addTopicPending: true };
    const state = reducer(
      prevState,
      { type: TOPICS_ADD_TOPIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addTopicPending).toBe(false);
    expect(state.addTopicError).toEqual(expect.anything());
  });

  it('handles action type TOPICS_ADD_TOPIC_DISMISS_ERROR correctly', () => {
    const prevState = { addTopicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TOPICS_ADD_TOPIC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addTopicError).toBe(null);
  });
});

