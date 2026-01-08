import React, { useEffect, useState, useContext } from "react";
import { logIn, getUserFromSession } from "../../utilities/user-functions";
import { AppContext } from "../../contexts/app_context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let { setUser } = useContext(AppContext);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(true);
  const [credentialError, setCredentialError] = useState(null);
  const [errors, setErrors] = useState({
    emailInvalid: null,
    passwordShort: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(formState.email && formState.password ? false : true);
  }, [formState]);

  const handleChange = (e) => {
    let propertyName = e.target.name;
    setFormState({
      ...formState,
      [propertyName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check for form errors prior to submitting
    let areErrorsPresent = false;
    const formErrors = {
      emailInvalid: null,
      passwordShort: null,
    };

    let email = formState.email;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let password = formState.password;

    if (!email.match(regex)) {
      formErrors.emailInvalid = true;
      areErrorsPresent = true;
    } else if (password.length < 8) {
      formErrors.passwordShort = true;
      areErrorsPresent = true;
    }

    if (areErrorsPresent) {
      setErrors(formErrors);
      return;
    }

    // if no form errors, try to submit form
    try {
      // make a call to the server, and authenticate
      let serverResponse = await logIn(formState);
      console.log(serverResponse);

      // if user authenticated, get session info (user)
      let user = await getUserFromSession();
      setUser(user);

      // redirect to /recipes/view
      if (user) {
        navigate("/recipes/view");
      } else {
        setCredentialError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.emailInvalid ? "Please enter a valid email" : ""}
            </p>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.passwordShort
                ? "Password must be at least 8 characters"
                : ""}
            </p>
          </div>
          <button type="submit" disabled={disabled}>
            Log In
          </button>
          <p className="error-message">
            {credentialError ? "login failed: email or password incorrect" : ""}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
