import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  burgerConstructorName,
  burgerConstructorReducer
} from './slices/burgerConstructorSlice';
import {
  ingredientsSliceName,
  ingredientsReducer
} from './slices/ingredientsSlice';
import { feedSliceReducer, feedSliceName } from './slices/feedSlice';
import { orderReducer, orderSliceName } from './slices/orderSlice';
import { userReducer, userSliceName } from './slices/userSlice';

export const rootReducer = combineReducers({
  [burgerConstructorName]: burgerConstructorReducer,
  [ingredientsSliceName]: ingredientsReducer,
  [feedSliceName]: feedSliceReducer,
  [orderSliceName]: orderReducer,
  [userSliceName]: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
