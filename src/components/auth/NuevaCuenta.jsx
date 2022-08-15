import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {

  // Extraer valores del context alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Extraer valores del context auth
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  // En caso que el usuario se autentica o registra o sea un registro duplicado
  useEffect(() => {
    if(autenticado){
      props.history.push("/proyectos");
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria); 
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  // State para iniciar sesión
  const [ usuario, guardarUsuario ] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  // Extraer usuario
  const { nombre, email, password, confirmar } = usuario;

  const onChange = e =>{
    guardarUsuario({
        ...usuario,
        [e.target.name]: e.target.value
    });
  };

  // Cuando el usuario quiere iniciar sesion
  const onSubmit = e =>{
    e.preventDefault();

    // Validacion de campos vacios
    if(nombre.trim() === "" 
      || email.trim() === "" 
      || password.trim() === "" 
      || confirmar.trim() === ""){
        mostrarAlerta("Todos los campos son obligatorios", "alert-error");  
        return;
    }

    // Validacion de password minimo de 6 caracteres
    if(password.length < 6){
      mostrarAlerta("El password debe ser de al menos 6 caracteres", "alert-error"); 
      return;
    }

    // Validacion de password iguales
    if(password !== confirmar){
      mostrarAlerta("Los passwords deben ser iguales", "alert-error"); 
      return;
    }

    // Pasar al action
    registrarUsuario({
      nombre,
      email,
      password
    });
  }

  return (
    <div className="user-form">
      { alerta ? ( <div className={`alert ${alerta.categoria}`} >{alerta.msg}</div> ) : null }
      <div className="form-container shadow-dark">
        <h1>Obtener una Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="form-field">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={"/"} className="account-link">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
 
export default NuevaCuenta;