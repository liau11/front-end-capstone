import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

const AuthenticationGuard = ({ component, ...props }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
      </div>
    ),
  });

  return <Component {...props}/>;
};

export default AuthenticationGuard;