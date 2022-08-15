import React, { useReducer } from 'react';
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import axiosClient from "../../config/axios";

import { 
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from "../../types";

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    };

    // Crear dispatch y state
    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await axiosClient.get("/api/tareas", { params: { proyecto } });

            dispatch({
                type: TAREAS_PROYECTOS,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await axiosClient.post("/api/tareas", tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Valida y muestra un error en caso que se necesite
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    // Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await axiosClient.delete(`/api/tareas/${id}`, { params: { proyecto }});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
           console.log(error); 
        }
    };

    
    // Modifica una tarea
    const actualizarTarea = async tarea => {
        try {
            const resultado = await axiosClient.put(`/api/tareas/${tarea._id}`, tarea);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Extrae una tarea para editarla
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    };

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );
};

export default TareaState;