import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: `http://127.0.0.1:5000/`,
    // transformRequest: [(data, headers) => {
    //     if(sessionStorage.getItem("access_token")){
    //         headers["Authorization"] = `Bearer ${sessionStorage.getItem("access_token")}`
    //     }
    //     return data
    // }]
});

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('access_token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
})

export default axiosInstance