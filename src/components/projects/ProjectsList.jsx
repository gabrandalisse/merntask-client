import Project from "./Project";
import React, { useContext, useEffect } from "react";
import AlertContext from "../../context/alerts/alertContext";
import ProjectContext from "../../context/projects/projectContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectsList = () => {
  const projectsContext = useContext(ProjectContext);
  const { message, projects, getProjects } = projectsContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // Get projects when the component is loaded
  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }

    getProjects();
    // eslint-disable-next-line
  }, [message]);

  // Check if the projects have any content
  if (projects.length === 0)
    return <p>There are no projects, start by creating one.</p>;

  return (
    <ul className="projects-list">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} timeout={200} classNames="projects">
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
