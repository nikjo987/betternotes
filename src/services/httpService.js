import axios from "axios";

axios.interceptors.request.use(
    (config) => {
        // config.baseURL = "http://localhost:3000"
        config.baseURL = "https://nervous-snaps-moth.cyclic.app";//process.env.NODE_API_URI || 
        return config;
    },
    (error) => {
        return error;
    }
);

let httpService =  {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    all: axios.all,
};


export default httpService;
