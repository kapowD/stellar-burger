import store, { rootReducer } from './store';

describe('rootReducer', () => {
  test('тестирование работы rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const storeState = store.getState();
    expect(initialState).toEqual(storeState);
  });
});
