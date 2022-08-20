import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authentication/authContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { authenticated, loading, authenticatedUser } = authContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  if (!authenticated && !loading) {
    navigate("/");
  }

  return children;
};

export default PrivateRoute;
