import React, { useContext, useEffect } from 'react';
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {

    // Extraer info de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []); 

    return (  
        <header className="app-header">
            { usuario ? ( <p className="user-name">Hola <span>{usuario.nombre}</span> </p> ) : null  }
            <nav className="principal-nav">
                <button
                    className="btn btn-blank log-out"
                    onClick={ () => cerrarSesion() }
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}
 
export default Barra;
