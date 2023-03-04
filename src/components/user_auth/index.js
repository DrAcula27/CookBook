import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../contexts/app_context";
import { Link } from "react-router-dom";

const UserAuth = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="user-auth">
      {user ? (
        <div>{`Logged in as: ${user.username}`}</div>
      ) : (
        <div>Browsing as Guest</div>
      )}
      {user ? (
        <div className="auth-btns">
          <Link to="/profile">
            <button>View Profile</button>
          </Link>
          <p>or</p>
          <Link to="/home">
            <button>Log Out</button>
          </Link>
        </div>
      ) : (
        <div className="auth-btns">
          <Link to="/users/signup">
            <button>Sign Up</button>
          </Link>
          <p>or</p>
          <Link to="/users/login">
            <button>Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
