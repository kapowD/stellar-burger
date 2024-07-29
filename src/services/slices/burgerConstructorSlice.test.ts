import { expect, describe, test } from '@jest/globals';
import {
  addIngredientToOrder,
  changeIngredientLayer,
  removeIngredientFromOrder,
  clearBurgerConstructor,
  burgerConstructorReducer,
  initialState,
} from './burgerConstructorSlice';

const mockIngredientBun = {
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
  __v: 0,
  id: 'constructorItems'
};

const mockIngredientMain = {
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
  __v: 0,
  id: 'ingredientMain'
};

const mockIngredientSauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  id: 'ingredientSauce'
};

describe('тестирование работы редьюсера конструктора бургера "burgerConstructorSlice"', () => {

  describe('addIngredientToOrder action', () => {
    test('добавление булки', () => {
      const expectedResult = { ...initialState, bun: { ...mockIngredientBun, id: expect.any(String) } };
      const newState = burgerConstructorReducer(
        initialState,
        addIngredientToOrder(mockIngredientBun)
      );
      expect(newState).toEqual(expectedResult);
    });

    test('добавление основного ингредиента', () => {
      const expectedResult = { ...initialState, ingredients: [{ ...mockIngredientMain, id: expect.any(String) }] };
      const newState = burgerConstructorReducer(
        initialState,
        addIngredientToOrder(mockIngredientMain)
      );
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('changeIngredientLayer action', () => {
    test('перемещение ингредиента', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredientMain, id: '1' },
          { ...mockIngredientSauce, id: '2' }
        ]
      };
      const expectedResult = {
        ...initialState,
        ingredients: [
          { ...mockIngredientSauce, id: '2' },
          { ...mockIngredientMain, id: '1' }
        ]
      };
      const newState = burgerConstructorReducer(
        stateWithIngredients,
        changeIngredientLayer({ fromIndex: 0, toIndex: 1 })
      );
      expect(newState).toEqual(expectedResult);
    });

    test('перемещение ингредиентов на одной позиции', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredientBun, id: 'bunId' },
          { ...mockIngredientMain, id: 'mainId' },
          { ...mockIngredientSauce, id: 'sauceId' }
        ]
      };
      const expectedResult = {
        ...initialState,
        ingredients: [
          { ...mockIngredientBun, id: 'bunId' },
          { ...mockIngredientSauce, id: 'sauceId' },
          { ...mockIngredientMain, id: 'mainId' }
        ]
      };
      const newState = burgerConstructorReducer(
        stateWithIngredients,
        changeIngredientLayer({ fromIndex: 1, toIndex: 2 })
      );
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('removeIngredientFromOrder action', () => {
    test('удаление ингредиента из заказа', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockIngredientMain, id: '1' },
          { ...mockIngredientSauce, id: '2' }
        ]
      };
      const expectedResult = {
        ...initialState,
        ingredients: [
          { ...mockIngredientSauce, id: '2' }
        ]
      };
      const newState = burgerConstructorReducer(
        stateWithIngredients,
        removeIngredientFromOrder('1')
      );
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('clearBurgerConstructor action', () => {
    test('очистка конструктора бургера', () => {
      const stateWithIngredients = {
        bun: { ...mockIngredientBun, id: 'bunId' },
        ingredients: [
          { ...mockIngredientMain, id: 'mainId' },
          { ...mockIngredientSauce, id: 'sauceId' }
        ]
      };
      const expectedResult = {
        ...initialState,
        bun: null,
        ingredients: []
      };
      const newState = burgerConstructorReducer(
        stateWithIngredients,
        clearBurgerConstructor()
      );
      expect(newState).toEqual(expectedResult);
    });
  });
});
