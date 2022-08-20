import React, { useReducer } from "react";
import axiosClient from "../../config/axios";
import ProjectContext from "./projectContext";
import ProjectReducer from "./projectReducer";
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  ERROR_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types";

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    form: false,
    errorForm: false,
    project: null,
    message: null,
  };

  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const showForm = () => {
    dispatch({
      type: PROJECT_FORM,
    });
  };

  const getProjects = async () => {
    try {
      const result = await axiosClient.get("/api/projects");

      dispatch({
        type: GET_PROJECTS,
        payload: result.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        category: "alert-error",
      };

      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };

  const addProject = async (project) => {
    try {
      const result = await axiosClient.post("/api/projects", project);

      dispatch({
        type: ADD_PROJECT,
        payload: result.data,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        category: "alert-error",
      };

      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };

  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  const actualProject = (projectId) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: projectId,
    });
  };

  const deleteProject = async (projectId) => {
    try {
      await axiosClient.delete(`api/projects/${projectId}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const alert = {
        msg: "There was an error",
        category: "alert-error",
      };

      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        errorForm: state.errorForm,
        project: state.project,
        message: state.message,
        showForm,
        getProjects,
        addProject,
        showError,
        actualProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
