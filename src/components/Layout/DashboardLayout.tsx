import React from "react";
import { DashboardNav } from "..";

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div id="viewport">
      <DashboardNav />
      <div className="container-fluid">{children}</div>
    </div>
  );
};
