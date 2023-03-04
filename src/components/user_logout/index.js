import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../contexts/app_context";

const UserLogout = () => {
  const { user } = useContext(AppContext);
  const handleViewProfile = () => {};
  const handleLogout = () => {};
  const handleSignUp = () => {};
  const handleLogIn = () => {};

  return (
    <div className="user-logout">
      {user ? (
        <div>`Logged in as ${user.name}`</div>
      ) : (
        <div>Browsing as Guest</div>
      )}
      {user ? (
        <div className="user-btns">
          <button className="btn-sm" onClick={handleViewProfile}>
            Profile
          </button>
          <button className="btn-sm" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="auth-btns">
          <button className="btn-sm" onClick={handleSignUp}>
            Sign Up
          </button>
          <p>or</p>
          <button className="btn-sm" onClick={handleLogIn}>
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLogout;
