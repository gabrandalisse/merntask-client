import Task from "./Task";
import React, { Fragment, useContext } from "react";
import TaskContext from "../../context/tasks/taskContext";
import ProjectContext from "../../context/projects/projectContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TasksList = () => {
  const projectContext = useContext(ProjectContext);
  const { project, deleteProject } = projectContext;

  const tasksContext = useContext(TaskContext);
  const { projectTasks } = tasksContext;

  // If there is not a selected project (first time)
  if (!project) return <h2>Select a project</h2>;

  const [actualProject] = project;

  const onClickDelete = () => {
    deleteProject(actualProject._id);
  };

  return (
    <Fragment>
      <h2>Project: {actualProject.name}</h2>

      <ul className="tasks-list">
        {projectTasks.length === 0 ? (
          <li className="task">
            {" "}
            <p>There are no tasks</p>{" "}
          </li>
        ) : (
          <TransitionGroup>
            {projectTasks.map((task) => (
              <CSSTransition
                key={task.id}
                timeout={200} //ms
                classNames="task"
              >
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button type="button" className="btn btn-delete" onClick={onClickDelete}>
        Delete Project &times;
      </button>
    </Fragment>
  );
};

export default TasksList;
