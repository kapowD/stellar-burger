import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { isAuthCheck } from '../../services/slices/userSlice';
export const ForgotPassword: FC = () => {
  const isAuthenticated = useSelector(isAuthCheck);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
