import React, { useContext } from "react";
import { DashboardLayout } from "../../components";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const onClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.token,
        },
      });

      const parseRes = await response.json();

      if (parseRes.success) {
        toast.success(parseRes.message);
        localStorage.removeItem("token");
        authContext.setAuth(false);
        history.push("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to delete");
    }
  };
  return (
    <DashboardLayout>
      <button onClick={onClick}>Delete Account</button>
    </DashboardLayout>
  );
};
