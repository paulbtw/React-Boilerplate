import React, { useState, useEffect, useContext } from "react";
import { DashboardLayout } from "../../components";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth-context";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  const authContext = useContext(AuthContext);
  return (
    <DashboardLayout>
      <div>
        {Object.keys(authContext.userData).length !== 0 &&
          Object.entries(authContext.userData).map((value, index) => (
            <div key={index}>
              <span>{value[0]}</span> {value[1]}
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
};
