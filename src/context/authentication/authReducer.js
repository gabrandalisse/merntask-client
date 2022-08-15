import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SUCCESS_REGISTER:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        authenticated: true,
        message: null,
        loading: false,
      };

    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };

    case LOG_OUT:
    case LOGIN_ERROR:
    case ERROR_REGISTER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
