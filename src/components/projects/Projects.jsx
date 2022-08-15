import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
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
          <FormTarea />
          <div className="tasks-container">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
