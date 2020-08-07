import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../components";
import { toast } from "react-toastify";

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [inputs, setInputs] = useState({
    email: "",
  });
  const { email } = inputs;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { email };
      const response = await fetch("http://localhost:5000/auth/reset", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.message && parseRes.success) {
        toast.success(parseRes.message);
      } else {
        toast.error(parseRes.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed");
    }
  };
  return (
    <Layout>
      <div className="form-wrapper my-5">
        <div className="form-inner">
          <form onSubmit={onFormSubmit}>
            <h3>Reset Password</h3>
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
            <button className="btn btn-primary btn-block">Submit</button>
            <p className="forgot-password text-right">
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};
