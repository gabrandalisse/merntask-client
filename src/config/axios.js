import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'https://merntasks-server-gab.herokuapp.com/'
});

export default clienteAxios;