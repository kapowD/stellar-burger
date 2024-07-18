import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearBurgerConstructor,
  constructorSelector
} from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  closeOrder,
  getLoading,
  createOrder,
  getOrder
} from '../../services/slices/orderSlice';
import { isAuthCheck } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(constructorSelector);
  const orderRequest = useSelector(getLoading);
  const orderModalData = useSelector(getOrder);
  const isAuthenticated = useSelector(isAuthCheck);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderIds: string[] = [
    ...constructorItems.ingredients.map((item) => item._id),
    constructorItems.bun?._id
  ].filter((id): id is string => !!id);

  const handleOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(createOrder(orderIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(clearBurgerConstructor());
    dispatch(closeOrder());
  };

  const totalPrice = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
