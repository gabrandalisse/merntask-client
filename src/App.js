import React from "react";
import authToken from "./config/tokenAuth";
import PrivateRoute from "./components/routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "./components/auth/LogIn";
import SignIn from "./components/auth/SignIn";
import Projects from "./components/projects/Projects";

import TaskState from "./context/tasks/taskState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/authentication/authState";
import ProjectState from "./context/projects/projectState";

// Check for a token in local storage
const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/new-account" element={<SignIn />} />
                <Route
                  path="/projects"
                  element={
                    <PrivateRoute>
                      <Projects />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
