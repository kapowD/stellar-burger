import { expect, describe, it } from '@jest/globals';
import {
  getFeedAll,
  getOrders,
  getOrderByNumber,
  feedSliceReducer,
  initialState
} from './feedSlice';

describe('тестирование работы редьюсера фида "feedSlice"', () => {
  const mockOrders = [
    {
      _id: '1',
      status: 'готов',
      name: 'Бургер',
      createdAt: '2024-07-23T06:14:12.597Z',
      updatedAt: '2024-07-23T06:14:12.597Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    }
  ];

  const mockFeedState = {
    orders: mockOrders,
    orderModalData: mockOrders,
    profileOrders: mockOrders,
    total: 12,
    totalToday: 2,
    loading: false,
    error: null
  };

  it('обработка начального состояния', () => {
    expect(feedSliceReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('getFeedAll action', () => {
    it('обработка состоянияpending', () => {
      const action = { type: getFeedAll.pending.type };
      const state = feedSliceReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('обработка состояния fulfilled', () => {
      const action = {
        type: getFeedAll.fulfilled.type,
        payload: mockFeedState
      };
      const expectedResult = {
        ...initialState,
        orders: mockOrders,
        total: 12,
        totalToday: 2,
        loading: false
      };
      const newState = feedSliceReducer(initialState, action);
      expect(newState).toEqual(expectedResult);
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: getFeedAll.rejected.type,
        error: { message: 'Ошибка' }
      };
      const expectedResult = {
        ...initialState,
        loading: false,
        error: 'Ошибка'
      };
      const newState = feedSliceReducer(
        { ...initialState, loading: true },
        action
      );
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('getOrders action', () => {
    it('обработка состояния pending', () => {
      const action = { type: getOrders.pending.type };
      const state = feedSliceReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('обработка состояния fulfilled', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: mockOrders
      };
      const expectedResult = {
        ...initialState,
        profileOrders: mockOrders,
        loading: false
      };
      const newState = feedSliceReducer(initialState, action);
      expect(newState).toEqual(expectedResult);
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: 'Ошибка' }
      };
      const expectedResult = {
        ...initialState,
        loading: false,
        error: 'Ошибка'
      };
      const newState = feedSliceReducer(
        { ...initialState, loading: true },
        action
      );
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('getOrderByNumber action', () => {
    it('обработка состояния pending', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = feedSliceReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('обработка состояния fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: mockOrders }
      };
      const expectedResult = {
        ...initialState,
        orderModalData: mockOrders,
        loading: false
      };
      const newState = feedSliceReducer(initialState, action);
      expect(newState).toEqual(expectedResult);
    });

    it('обработка состояния rejected', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Ошибка' }
      };
      const expectedResult = {
        ...initialState,
        loading: false,
        error: 'Ошибка'
      };
      const newState = feedSliceReducer(
        { ...initialState, loading: true },
        action
      );
      expect(newState).toEqual(expectedResult);
    });
  });
});
