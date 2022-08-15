import React, { useContext } from "react";
import TaskContext from "../../context/tareas/tareaContext";
import ProjectContext from "../../context/proyectos/proyectoContext";

const Project = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { actualProject } = projectContext;

  const tasksContext = useContext(TaskContext);
  const { getTasks } = tasksContext;

  // Set the current project
  const seleccionarProyecto = (id) => {
    actualProject(id); // Set a project as current
    getTasks(id); // Filter the tasks when the user click it
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
