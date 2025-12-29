import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ requireAdmin }: Props) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="p-6">로딩중...</p>;
  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
};
