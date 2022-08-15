import React, { useContext, useEffect } from 'react';
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {

  // Extraer proyecyos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  // Verificar si proyectos tiene contenidos
  if(proyectos.length === 0) return (<p>No hay proyectos, comienza creando uno.</p>);

  return (
    <ul className="projects-list">
      { alerta ? ( <div className={`alert ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition
            key={proyecto._id}
            timeout={200}
            classNames="projects"
          >
            <Proyecto 
              proyecto={proyecto} 
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
 
export default ListadoProyectos;
