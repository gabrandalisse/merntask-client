import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./components/routes/RutaPrivada";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if(token){
  tokenAuth(token);
}

// Dentro del <switch> va cada una de las paginas del proyecto

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>

            <Router>
              <Routes>
                <Route  path="/" element={<Login />} />
                <Route  path="/nueva-cuenta" element={<NuevaCuenta />} />
                // TODO:  fix this private route 
                <Route  path="/proyectos" element={<Proyectos />} />
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
