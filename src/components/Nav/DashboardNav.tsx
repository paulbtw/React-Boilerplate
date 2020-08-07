import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdSettings } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AuthContext } from "../../context/auth-context";

interface DashboardNavProps {}

export const DashboardNav: React.FC<DashboardNavProps> = ({}) => {
  const authContext = useContext(AuthContext);
  return (
    <div id="sidebar">
      <header>
        <Link to="/dashboard">Home</Link>
      </header>
      <ul className="nav">
        <li>
          <Link to="/dashboard">
            <MdDashboard /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <MdSettings /> Settings
          </Link>
        </li>
        <li>
          <a href="#" onClick={authContext.logout}>
            <RiLogoutBoxRLine />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
