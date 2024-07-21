import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedAll,
  getFeedLoading,
  getFeed
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeed);
  const isLoading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(getFeedAll());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeedAll());
  };
  return (
    <>
      {!isLoading ? (
        <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      ) : (
        <Preloader />
      )}
    </>
  );
};
