import React, { useContext } from 'react';
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {

    // Obtener la funcion eliminar tarea desde el context
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // Extraer proyecyos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Extraer proyecto
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta en btn eliminar
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    };

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    };

    // Agrega una tarea actual cuando el usuario la edita
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    };

    return (
      <li className="task shadow">
        <p>{tarea.nombre}</p>
        <div className="state">
            {tarea.estado
            ?
                (
                   <button
                    type="button"
                    className="complete"
                    onClick={() => cambiarEstado(tarea)}
                   >
                       Completo
                   </button>     
                )
            :
                (
                    <button
                    type="button"
                    className="incomplete"
                    onClick={() => cambiarEstado(tarea)}
                   >
                       Incompleto
                   </button>   
                )
            }
        </div>
        <div className="actions">
            <button
                type="button"
                className="btn bt-primary"
                onClick={ () => seleccionarTarea(tarea) }
            >
                Editar
            </button>
            <button
             type="button"
             className="btn bt-secondary"
             onClick={() => tareaEliminar(tarea._id)}
            >
                Eliminar
            </button>
        </div>
      </li>
    );
}
 
export default Tarea;