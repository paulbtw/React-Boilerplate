import React, { useState, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import {
  Landing,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  Settings,
  Verify,
} from "./views";

export const Routes = () => {
  const authContext = useContext(AuthContext);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) =>
          !authContext.isAuth ? <Landing /> : <Redirect to="/dashboard" />
        }
      />
      <Route
        exact
        path="/login"
        render={(props) =>
          !authContext.isAuth ? <SignIn /> : <Redirect to="/dashboard" />
        }
      />
      <Route
        exact
        path="/register"
        render={(props) =>
          !authContext.isAuth ? <SignUp /> : <Redirect to="/dashboard" />
        }
      />
      <Route
        exact
        path="/reset"
        render={(props) =>
          !authContext.isAuth ? (
            <ForgotPassword />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
      <Route
        exact
        path="/reset/:token"
        render={(props) =>
          !authContext.isAuth ? (
            <ResetPassword token={props.match.params.token} />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
      <Route
        exact
        path="/verify/:token"
        render={(props) =>
          !authContext.isAuth ? (
            <Verify token={props.match.params.token} />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
      <Route
        exact
        path="/dashboard"
        render={(props) =>
          authContext.isAuth ? <Dashboard /> : <Redirect to="/" />
        }
      />
      <Route
        exact
        path="/settings"
        render={(props) =>
          authContext.isAuth ? <Settings /> : <Redirect to="/" />
        }
      />
      <Route
        render={(props) =>
          authContext.isAuth ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </Switch>
  );
};
