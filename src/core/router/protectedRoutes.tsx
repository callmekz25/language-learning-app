import Loading from '@/components/ui/loading';
import { useAuth } from '@/shared/hooks/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
};
export default ProtectedRoutes;
