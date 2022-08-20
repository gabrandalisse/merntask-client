import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/authContext";

const SignIn = (props) => {
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, registerUser } = authContext;

  // If the user is authenticated or sign in or if it is a duplicated sign in
  useEffect(() => {
    if (authenticated) {
      navigate("/projects");
    }

    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]);

  // Log in state
  const [user, saveUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { name, email, password, confirm } = user;

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("All fields are required", "alert-error");
      return;
    }

    if (password.length < 6) {
      showAlert(
        "The passowrd lenght must be at least 6 characters",
        "alert-error"
      );
      return;
    }

    if (password !== confirm) {
      showAlert("The passwords are not equals", "alert-error");
      return;
    }

    registerUser({
      name,
      email,
      password,
    });
  };

  return (
    <div className="user-form">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="form-container shadow-dark">
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Your password"
              value={confirm}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <Link to={"/"} className="account-link">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
