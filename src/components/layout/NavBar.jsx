import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const { user, authenticatedUser, logOut } = authContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="user-name">
          Hello <span>{user.name}!</span>{" "}
        </p>
      ) : null}
      <nav className="principal-nav">
        <button className="btn btn-blank log-out" onClick={() => logOut()}>
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
