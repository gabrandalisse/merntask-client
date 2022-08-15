import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTasks: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        projectTasks: [action.payload, ...state.projectTasks],
        taskError: false,
      };

    case VALIDATE_TASK:
      return {
        ...state,
        taskError: true,
      };

    case DELETE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(
          (task) => task._id !== action.payload
        ),
      };

    case UPDATE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case ACTUAL_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };

    case CLEAN_TASK:
      return {
        ...state,
        selectedTask: null,
      };

    default:
      return state;
  }
};
