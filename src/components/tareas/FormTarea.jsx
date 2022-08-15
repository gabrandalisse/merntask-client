import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

  // Extraer proyecyos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener funcion de agregar tarea
  const tareasContext = useContext(tareaContext);
  const { tareaseleccionada, errortarea, agregarTarea, validarTarea, 
    obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

  // Effect que detecta la seleccion de una tarea
  useEffect(() => {
    if(tareaseleccionada !== null){
      guardarTarea(tareaseleccionada);

    } else {
      guardarTarea({
        nombre: ""
      });
    }
  }, [tareaseleccionada])
  

  // State del formulario
  const [ tarea, guardarTarea ] = useState({
    nombre: ""
  });

  // Extrae nombre del proyecto
  const { nombre } = tarea;

  // Si no existe ningun proyecto seleccionado
  if(!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del form
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault()

    // Validar
    if(nombre.trim() === ""){
      validarTarea();
      return;
    }

    // Es edicion o nueva tarea
    if(tareaseleccionada === null){
      // Es una tarea nueva entonces agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);  

    } else {
      // Se actializa la tarea existente
      actualizarTarea(tarea);

      // Elimina la tarea seleccionada del state
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    // Reiniciar el form
    guardarTarea({
      nombre: ""
    });
  };

  return (
    <div className="custom-form">
      <form
        onSubmit={onSubmit}
      >
        <div className="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <input 
              type="submit"
              className="btn btn-primary btn-submit btn-block"
              value={ tareaseleccionada ? "Editar Tarea" : "Agregar Tarea" } 
          />
        </div>
      </form>

      {errortarea ? <p className="message error">El nombre de la tarea es obligatorio</p> : null}
    </div>
  );
}
 
export default FormTarea;