import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";
import UserAuth from "../user_auth";
import "./index.css";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="left-links">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Logo />
        </Link>
        <Link to="/recipes/view" className="button btn-sm">
          {"Search Recipes"}
        </Link>
      </div>
      <UserAuth />
    </nav>
  );
};

export default Nav;
