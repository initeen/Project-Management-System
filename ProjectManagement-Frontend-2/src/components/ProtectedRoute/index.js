// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLoginContext } from 'contexts/LoginContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useLoginContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
