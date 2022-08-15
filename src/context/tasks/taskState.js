import TaskContext from "./taskContext";
import TaskReducer from "./taskReducer";
import React, { useReducer } from "react";
import axiosClient from "../../config/axios";

import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from "../../types";

const TaskState = (props) => {
  const initialState = {
    projectTasks: [],
    taskError: false,
    selectedTask: null,
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = async (project) => {
    try {
      const result = await axiosClient.get("/api/tasks", {
        params: { project },
      });

      dispatch({
        type: PROJECT_TASKS,
        payload: result.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      const result = await axiosClient.post("/api/tasks", task);
      console.log(result);

      dispatch({
        type: ADD_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  const deleteTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });

      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const result = await axiosClient.put(`/api/tasks/${task._id}`, task);

      dispatch({
        type: UPDATE_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveCurrentTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        projectTasks: state.projectTasks,
        taskError: state.taskError,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveCurrentTask,
        updateTask,
        cleanTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
