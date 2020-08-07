import React, { useEffect } from "react";
import { Layout } from "../../components";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

interface VerifyProps {
  token: string;
}

export const Verify: React.FC<VerifyProps> = ({ token }) => {
  const history = useHistory();

  const verifyRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/verify/${token}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const parseRes = await response.json();

      if (parseRes.success) {
        history.push("/login");
        toast.success(parseRes.message);
      } else {
        history.push("/");
        toast.error(parseRes.message);
      }
    } catch (err) {
      history.push("/");
      console.log(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifyRequest();
  }, []);
  return (
    <Layout>
      <h1>Verification</h1>
    </Layout>
  );
};
