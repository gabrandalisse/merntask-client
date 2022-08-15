import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListadoProyectos from "../proyectos/ListadoProyectos";

const SideBar = () => {
  return (
    <aside>
      <h1>
        MERN<span>Tasks</span>
        <NuevoProyecto />
      </h1>

      <div className="projects">
        <h2>Your Projects</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default SideBar;
