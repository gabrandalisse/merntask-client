import React, { useContext, useEffect } from 'react';
import Sidebar from "../layout/Sidebar";
import NavBar from "../layout/NavBar";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticacion/authContext";

const Proyectos = () => {

  // Extraer info de autenticacion
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
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
}
 
export default Proyectos;