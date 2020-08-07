import React, { useState, useEffect } from "react";
import { Layout } from "../../components";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface ResetPasswordProps {
  token: string;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const [inputs, setInputs] = useState({
    resetToken: token,
    password: "",
    confirmPassword: "",
  });
  const { resetToken, password, confirmPassword } = inputs;

  const history = useHistory();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const testToken = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/reset/${token}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const parseRes = await response.json();

      if (!parseRes.success) {
        toast.error(parseRes.message);
        history.push("/reset");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Validation failed");
    }
  };

  useEffect(() => {
    testToken();
  }, []);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { resetToken, password, confirmPassword };
      const response = await fetch(
        `http://localhost:5000/auth/reset/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();

      if (parseRes.success) {
        toast.success(parseRes.message);
        history.push("/login");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Password change failed");
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
                name="resetToken"
                value={resetToken}
                placeholder="Reset token"
                className="form-control"
                readOnly
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
          </form>
        </div>
      </div>
    </Layout>
  );
};
