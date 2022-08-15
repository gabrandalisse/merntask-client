import React from "react";
import authToken from "./config/tokenAuth";
import PrivateRoute from "./components/routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "./components/auth/LogIn";
import SignIn from "./components/auth/SignIn";
import Projects from "./components/projects/Projects";

import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import ProyectoState from "./context/proyectos/proyectoState";

// Check for a token in local storage
const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
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
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
