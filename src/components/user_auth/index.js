import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../contexts/app_context";
import { Link } from "react-router-dom";

const UserAuth = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="user-logout">
      {user ? (
        <div>`Logged in as ${user.name}`</div>
      ) : (
        <div>Browsing as Guest</div>
      )}
      {user ? (
        <div className="user-btns">
          <Link to="/profile">
            <button className="btn-sm">Profile</button>
          </Link>
          <Link to="/users/logout">
            <button className="btn-sm">Log Out</button>
          </Link>
        </div>
      ) : (
        <div className="auth-btns">
          <Link to="/users/signup">
            <button className="btn-sm">Sign Up</button>
          </Link>
          <p>or</p>
          <Link to="/users/login">
            <button className="btn-sm">Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
