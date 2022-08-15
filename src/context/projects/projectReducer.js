import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  ERROR_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case PROJECT_FORM:
      return {
        ...state,
        form: true,
      };

    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],

        // Once the project is added, close the form
        form: false,

        // When the project is created, we clean the error message if there was any
        errorForm: false,
      };

    case VALIDATE_FORM:
      return {
        ...state,
        errorForm: true,
      };

    case ACTUAL_PROJECT:
      return {
        ...state,
        project: state.projects.filter(
          (project) => project._id === action.payload
        ),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        project: null,
      };

    case ERROR_PROJECT:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
