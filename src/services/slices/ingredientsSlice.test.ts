import { expect, describe, it } from '@jest/globals';
import {
  fetchAllIngredients,
  ingredientsReducer,
  initialState
} from './ingredientsSlice';

describe('тестирование работы редьюсера ингредиентов "ingredientsSlice"', () => {
  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    }
  ];

  it('обработка начального состояния', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('fetchAllIngredients action', () => {
    it('обработка состояния  pending', () => {
      const action = { type: fetchAllIngredients.pending.type };
      const newState = ingredientsReducer(initialState, action);
      const expectedResult = {
        ...initialState,
        loading: true
      };
      expect(newState).toEqual(expectedResult);
    });

    it('обработка состояния fulfilled', () => {
      const action = {
        type: fetchAllIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const expectedResult = {
        ...initialState,
        loading: false,
        data: mockIngredients
      };
      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual(expectedResult);
    });

    it('обработка состояния rejected', () => {
      const action = { type: fetchAllIngredients.rejected.type };
      const stateWithLoading = { ...initialState, loading: true };
      const expectedResult = { ...initialState, loading: false };
      const newState = ingredientsReducer(stateWithLoading, action);
      expect(newState).toEqual(expectedResult);
    });
  });
});
