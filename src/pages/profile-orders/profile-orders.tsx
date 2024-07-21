import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getProfileOrders, getOrders } from '../../services/slices/feedSlice';
import { getFeedAll } from '../../services/slices/feedSlice';
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getProfileOrders) || [];
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getFeedAll());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
