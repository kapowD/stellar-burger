import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}
export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};
interface ReorderIngredientPayload {
  fromIndex: number;
  toIndex: number;
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorSelector: (state) => state
  },
  reducers: {
    addIngredientToOrder: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    changeIngredientLayer: (
      state,
      action: PayloadAction<ReorderIngredientPayload>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const { ingredients } = state;
      if (
        fromIndex >= 0 &&
        fromIndex < ingredients.length &&
        toIndex >= 0 &&
        toIndex < ingredients.length
      ) {
        const [movedIngredient] = ingredients.splice(fromIndex, 1);
        ingredients.splice(toIndex, 0, movedIngredient);
      }
    },
    removeIngredientFromOrder: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});
export const burgerConstructorName = burgerConstructorSlice.name;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { constructorSelector } = burgerConstructorSlice.selectors;

export const {
  addIngredientToOrder,
  changeIngredientLayer,
  removeIngredientFromOrder,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;
