import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderBurgerSliceState {
  order: TOrder | null;
  error?: string | null;
  loading: boolean;
}

export const initialState: OrderBurgerSliceState = {
  order: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'user/getOrderBurger',
  orderBurgerApi
);

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getOrder: (state) => state.order,
    getLoading: (state) => state.loading
  }
});

export const { getOrder, getLoading } = orderBurgerSlice.selectors;

export const { closeOrder } = orderBurgerSlice.actions;
export const orderSliceName = orderBurgerSlice.name;
export const orderReducer = orderBurgerSlice.reducer;
