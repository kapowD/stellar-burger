import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IIngredientsState {
  data: TIngredient[];
  loading: boolean;
}

export const initialState: IIngredientsState = {
  data: [],
  loading: false
};

export const fetchAllIngredients = createAsyncThunk(
  'ingredients/fetchAllIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllIngredients.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    ingredientsSelector: (state) => state.data,
    ingredientsLoadingSelector: (state) => state.loading
  }
});

export const ingredientsSliceName = ingredientsSlice.name;
export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector, ingredientsLoadingSelector } =
  ingredientsSlice.selectors;
