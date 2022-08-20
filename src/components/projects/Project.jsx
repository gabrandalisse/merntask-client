import React, { useContext } from "react";
import TaskContext from "../../context/tasks/taskContext";
import ProjectContext from "../../context/projects/projectContext";

const Project = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { actualProject } = projectContext;

  const tasksContext = useContext(TaskContext);
  const { getTasks } = tasksContext;

  // Set the current project
  const selectProject = (id) => {
    actualProject(id); // Set a project as current
    getTasks(id); // Filter the tasks when the user click it
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
