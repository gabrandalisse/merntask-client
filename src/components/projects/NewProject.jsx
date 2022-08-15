import React, { Fragment, useState, useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";

const NewProject = () => {
  const projectsContext = useContext(ProjectContext);
  const { form, formError, showForm, addProject, showError } = projectsContext;

  const [project, saveProject] = useState({
    name: "",
  });

  const { name } = project;

  const onChangeProject = (e) => {
    saveProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProject = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      showError();
      return;
    }

    addProject(project);

    saveProject({
      name: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primary"
        onClick={(e) => showForm()}
      >
        New Project
      </button>

      {form ? (
        <form className="form-new-project" onSubmit={onSubmitProject}>
          <input
            type="text"
            className="input-text"
            placeholder="Project Name"
            name="name"
            value={name}
            onChange={onChangeProject}
          />

          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Add Project"
          />
        </form>
      ) : null}

      {formError ? (
        <p className="message error">The name of the project is required</p>
      ) : null}
    </Fragment>
  );
};

export default NewProject;
