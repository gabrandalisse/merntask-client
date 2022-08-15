import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import React, { useReducer } from "react";
import axiosClient from "../../config/axios";
import authToken from "../../config/tokenAuth";
import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/users", data);
      console.log(response.data);

      dispatch({
        type: SUCCESS_REGISTER,
        payload: response.data,
      });

      // Get user
      authenticatedUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };

      dispatch({
        type: ERROR_REGISTER,
        payload: alert,
      });
    }
  };

  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) authToken(token);

    try {
      const response = await axiosClient.get("/api/auth");

      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const logIn = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });

      authenticatedUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  const logOut = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        logIn,
        authenticatedUser,
        logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
