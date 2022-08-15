import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://merntasks-server-gab.herokuapp.com/'
});

export default axiosClient;