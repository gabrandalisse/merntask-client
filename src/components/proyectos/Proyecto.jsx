import React, { useContext } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {

  // State de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  // Obtener funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  // Funcion que agrega el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id);  // Fija un proyecto como actual
    obtenerTareas(id);  // Filtra las tareas cuando el usuario hace click
  }

  return (
    <li>
      <button 
          type="button" 
          className="btn btn-blank"
          onClick={ () => seleccionarProyecto(proyecto._id) }
      >
        {proyecto.nombre}
      </button>
    </li>
  );
}
 
export default Proyecto;