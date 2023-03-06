import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../utilities/user-functions";

export default class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (e) => {
    let propertyName = e.target.name;
    this.setState({
      [propertyName]: e.target.value,
      error: "",
    });
  };

  handleSubmit = async (e) => {
    // disable page refresh
    e.preventDefault();

    // grab form data from frontend
    let formData = { ...this.state };
    delete formData.confirm;
    delete formData.error;

    // make async call to server
    let response = await signUp(formData);

    console.log(response);

    // if user successfully added, redirect to /recipes/view
    // const navigate = useNavigate();
    // if (user) {
    //   navigate("/recipes/view");
    // }
  };

  render() {
    // check password and confirm match on every rerender
    const disable = this.state.password !== this.state.confirm;

    return (
      <div className="auth-container">
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" disabled={disable}>
              Sign Up
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
