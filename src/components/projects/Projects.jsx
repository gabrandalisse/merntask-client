import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import TaskForm from "../tasks/TaskForm";
import TasksList from "../tasks/TasksList";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Projects = () => {
  const authContext = useContext(AuthContext);
  const { authenticatedUser } = authContext;

  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app-container">
      <SideBar />
      <div className="principal-section">
        <NavBar />
        <main>
          <TaskForm />
          <div className="tasks-container">
            <TasksList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
