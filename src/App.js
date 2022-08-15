import React from "react";
import tokenAuth from "./config/tokenAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LogIn from "./components/auth/LogIn";
import SignIn from "./components/auth/SignIn";
import Projects from "./components/projects/Projects";

import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import RutaPrivada from "./components/routes/RutaPrivada";
import ProyectoState from "./context/proyectos/proyectoState";

// Check for a token in local storage
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
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
                <Route path="/nueva-cuenta" element={<SignIn />} />
                // TODO: fix this private route
                <Route path="/proyectos" element={<Projects />} />
                {/* <RutaPrivada exact path="/proyectos" component={Proyectos} /> */}
              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
