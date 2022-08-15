import TaskContext from "../../context/tareas/tareaContext";
import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../../context/proyectos/proyectoContext";

const TaskForm = () => {
  const projectsContext = useContext(ProjectContext);
  const { project } = projectsContext;

  const tasksContext = useContext(TaskContext);
  const {
    selectedTask,
    taskError,
    addTask,
    validateTask,
    getTasks,
    updateTask,
    cleanTask,
  } = tasksContext;

  // Effect that detects when a task has been selected
  useEffect(() => {
    if (selectedTask !== null) {
      saveTask(selectedTask);
    } else {
      saveTask({
        name: "",
      });
    }
  }, [selectedTask]);

  const [task, saveTask] = useState({
    name: "",
  });

  const { name } = task;

  // If there is no selected project
  if (!project) return null;

  const [actualProject] = project;

  const handleChange = (e) => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      validateTask();
      return;
    }

    if (selectedTask === null) {
      // Is a new task, we add the new task to the tasks state
      task.project = actualProject._id;
      addTask(task);
    } else {
      updateTask(task);
      cleanTask();
    }

    getTasks(actualProject.id);
    saveTask({
      name: "",
    });
  };

  return (
    <div className="custom-form">
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Task Name..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value={selectedTask ? "Update Task" : "Add Task"}
          />
        </div>
      </form>

      {taskError ? (
        <p className="message error">The name of the task is required</p>
      ) : null}
    </div>
  );
};

export default TaskForm;
