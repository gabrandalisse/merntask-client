import React, { useContext, useEffect } from 'react';
import { Route } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";
import { useNavigate } from "react-router-dom";



const RutaPrivada = ({ component: Component, ...props }) => {
    //TODO CHECK IF THIS APPROACH IS RIGHT
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            navigate("/")
        ) : (
            <Component {...props} />
        ) }
        />
    );
}

export default RutaPrivada;