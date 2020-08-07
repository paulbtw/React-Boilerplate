import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";
import { Layout } from "../../components";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = ({}) => {
  const authContext = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        authContext.setAuth(true);
        toast.success("Logged In!");
      } else {
        authContext.setAuth(false);
        toast.error(parseRes.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Login failed");
    }
  };

  return (
    <Layout>
      <div className="form-wrapper my-5">
        <div className="form-inner">
          <form onSubmit={onFormSubmit}>
            <h3>Login</h3>
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={email}
                placeholder="E-Mail"
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text-right">
              Forgot <Link to="/reset">password?</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};
