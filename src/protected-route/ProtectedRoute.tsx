import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { isAuthCheck } from '../services/slices/userSlice';
import { ProtectedRouteProps } from './type';
import { Preloader } from '../components/ui/preloader';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const isAuthUser = useSelector(isAuthCheck);

  if (isAuthUser === undefined) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthUser) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthUser) {
    const redirectTo = location.state?.from || '/';
    return <Navigate replace to={redirectTo} />;
  }

  return <>{children}</>;
};
