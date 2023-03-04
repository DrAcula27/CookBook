import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";
import UserLogout from "../user_logout";
import "./index.css";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="left-links">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>
        <Link to="/view_recipes" className="button btn-sm">
          {"Search Recipes"}
        </Link>
      </div>
      <UserLogout />
    </nav>
  );
};

export default Nav;
