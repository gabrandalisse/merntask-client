import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, logIn } = authContext;

  // If the password or the user does not exists
  useEffect(() => {
    if (authenticated) {
      props.history.push("/proyectos");
    }

    if (message) {
      showAlert(message.msg, message.categoria);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]);

  // Log in state
  const [user, saveUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are required", "alert-error");
      return;
    }

    logIn({ email, password });
  };

  return (
    // TODO translate css class names
    <div className="user-form">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="form-container shadow-dark">
        <h1>Log In</h1>

        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Log In"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="account-link">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Login;
