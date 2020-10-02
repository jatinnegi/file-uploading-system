import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { AuthState } from "../../store/auth/types/Auth";

interface Props {
  component: any;
  exact: boolean;
  path: string;
  auth: AuthState;
}

const PrivateRoute: React.FC<Props> = ({
  auth: { isAuthenticated, isLoading },
  component: Component,
  exact,
  path,
}) => {
  if (exact) {
    return (
      <Route
        exact
        path={path}
        render={(props) =>
          isLoading ? (
            "Loading"
          ) : isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  } else {
    return (
      <Route
        path={path}
        render={(props) =>
          isLoading ? (
            "Loading"
          ) : isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
