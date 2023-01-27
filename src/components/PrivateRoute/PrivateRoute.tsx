import { Outlet, Navigate } from "react-router-dom";

import { useAuthStatus } from "hooks/useAuthStatus";

import Spinner from "components/Spinner";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
