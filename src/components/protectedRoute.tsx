import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import type { JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((state) => state.user);
  return user ? children : <Navigate to="/login" />;
}
