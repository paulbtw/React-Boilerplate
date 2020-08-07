import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Nav, Layout } from "../../components";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = ({}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const history = useHistory();

  const { email, password, confirmPassword, name } = inputs;
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { email, password, confirmPassword, name };
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.success) {
        history.push("/");
        toast.success("Registered successfully");
      } else {
        toast.error("Failed to register");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <div className="form-wrapper my-5">
        <div className="form-inner">
          <form onSubmit={onFormSubmit}>
            <h3>Register</h3>
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
                type="text"
                name="name"
                value={name}
                placeholder="Name"
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

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => onChange(e)}
                className="form-control"
              />
            </div>

            <button className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text-right">
              Already registered? <Link to="/login">Sign in!</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};
