/* import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { User } from '../types/User';

interface ProtectedRouteProps {
  user: User | null;
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, path, element }) => {
  return user ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
 */


import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
