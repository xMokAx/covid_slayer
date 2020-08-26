import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PublicRoute({ children, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/game",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
