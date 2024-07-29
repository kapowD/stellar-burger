import { orderReducer, createOrder, initialState } from './orderSlice';

describe('тестирование работы редьюсера "orderBurgerSlice"', () => {
  const actions = {
    pending: {
      type: createOrder.pending.type,
      payload: null
    },
    fulfilled: {
      type: createOrder.fulfilled.type,
      payload: {
        order: ['1']
      }
    },
    rejected: {
      type: createOrder.rejected.type,
      error: { message: 'Some error' }
    }
  };

  it('обработка начального состояния', () => {
    const state = orderReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('тестирование работы экшена "getOrderBurger/pending"', () => {
    const state = orderReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тестирование работы экшена "getOrderBurger/fulfilled"', () => {
    const state = orderReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.order).toBe(actions.fulfilled.payload.order);
  });

  it('тестирование работы экшена "getOrderBurger/rejected"', () => {
    const state = orderReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });
});
