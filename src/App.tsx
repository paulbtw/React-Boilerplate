import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Routes";
import { AuthContext } from "./context/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  return (
    <Router>
      {authContext.loading ? (
        <div className="loading-wrapper">
          <h1>Loading...</h1>
        </div>
      ) : (
        <Routes />
      )}
    </Router>
  );
};

export default App;
