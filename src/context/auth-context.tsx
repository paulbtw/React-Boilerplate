import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  loading: true,
  login: () => {},
  logout: () => {},
  setAuth: (value: boolean) => {},
  userData: {},
});

const AuthContextProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const checkAuthenticated = async () => {
    if (localStorage.token) {
      try {
        const res = await fetch("http://localhost:5000/auth/verify", {
          method: "POST",
          headers: { "x-auth-token": localStorage.token },
        });

        const parseRes = await res.json();

        if (parseRes === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  const getUser = async () => {
    const userObj = localStorage.getItem("user");
    if (userObj) {
      return setUserData(JSON.parse(userObj));
    }
    try {
      const res = await fetch("http://localhost:5000/auth/info", {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.token,
          "Content-type": "application/json",
        },
      });

      const parseRes = await res.json();

      if (parseRes.success === true) {
        localStorage.setItem("user", JSON.stringify(parseRes.userInfo));
        setUserData(parseRes.userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isAuth: isAuthenticated,
        loading: loading,
        setAuth: setAuth,
        userData: userData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
