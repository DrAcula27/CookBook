import React, { useEffect, useState, useContext } from "react";
import {
  logIn,
  getUserFromSession,
  signUp,
} from "../../utilities/user-functions";
import { AppContext } from "../../contexts/app_context";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  let { setUser } = useContext(AppContext);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    noUsername: null,
    emailInvalid: null,
    passwordShort: null,
    passwordMismatch: null,
    userAlreadyExists: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setDisabled(formState.password === formState.confirm ? false : true);
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
      noUsername: null,
      emailInvalid: null,
      passwordShort: null,
      passwordMismatch: null,
    };

    let username = formState.username;
    let email = formState.email;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let password = formState.password;
    let confirm = formState.confirm;

    if (!username) {
      formErrors.noUsername = true;
      areErrorsPresent = true;
    } else if (!email.match(regex)) {
      formErrors.emailInvalid = true;
      areErrorsPresent = true;
    } else if (password.length < 8) {
      formErrors.passwordShort = true;
      areErrorsPresent = true;
    } else if (password !== confirm) {
      formErrors.passwordMismatch = true;
      areErrorsPresent = true;
    }

    if (areErrorsPresent) {
      setErrors(formErrors);
      return;
    }

    // if no form errors, try to submit form
    try {
      // grab form data from frontend
      let formData = { ...formState };
      delete formData.confirm;
      delete formData.error;

      // make async call to server
      let serverResponse = await signUp(formData);
      console.log("signup response: ", serverResponse);

      // if user successfully added, automatically log user in
      if (serverResponse.status === 201) {
        await logIn(formData);
      }

      // get session info (user)
      let user = await getUserFromSession();
      setUser(user);

      // if user authenticated, redirect to /recipes/view
      if (user) {
        navigate("/recipes/view");
      }
    } catch (error) {
      console.error(error);
      setErrors({
        ...errors,
        userAlreadyExists: error.response.data.message,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.noUsername ? "Please enter a username" : ""}
            </p>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            {errors.userAlreadyExists && (
              <p className="error-message">{errors.userAlreadyExists}</p>
            )}
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
          <div>
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={formState.confirm}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.passwordMismatch ? "Make sure your passwords match" : ""}
            </p>
          </div>
          <button type="submit" disabled={disabled}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
