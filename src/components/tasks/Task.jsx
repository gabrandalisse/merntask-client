import React, { useContext } from "react";
import TaskContext from "../../context/tasks/taskContext";
import ProjectContext from "../../context/projects/projectContext";

const Task = ({ task }) => {
  const tasksContext = useContext(TaskContext);
  const { deleteTask, getTasks, updateTask, saveCurrentTask } = tasksContext;

  const projectsContext = useContext(ProjectContext);
  const { project } = projectsContext;

  const [currentProject] = project;

  const taskDeletion = (id) => {
    deleteTask(id, currentProject._id);
    getTasks(currentProject.id);
  };

  const changeState = (task) => {
    if (task.state) task.state = false;
    else task.state = true;

    updateTask(task);
  };

  const selectTask = (task) => {
    saveCurrentTask(task);
  };

  return (
    <li className="task shadow">
      <p>{task.name}</p>
      <div className="state">
        {task.state ? (
          <button
            type="button"
            className="complete"
            onClick={() => changeState(task)}
          >
            Complete
          </button>
        ) : (
          <button
            type="button"
            className="incomplete"
            onClick={() => changeState(task)}
          >
            Incomplete
          </button>
        )}
      </div>
      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => selectTask(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => taskDeletion(task._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
