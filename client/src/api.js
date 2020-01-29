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
    if (!config.headers.Authorization) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
})

axiosInstance.interceptors.response.use(response => response, error => {
    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => reject(error));
    }

    if (error.config.url === "users/refresh") {
        sessionStorage.clear();
        return new Promise((resolve, reject) => reject(error));
    }

    const refreshToken = sessionStorage.getItem("refresh_token");

    return axiosInstance.post("users/refresh", null, {
        headers: {
            Authorization: refreshToken ? `Bearer ${refreshToken}` : ""
        }
    }).then(response => {
        sessionStorage.setItem("access_token", response.data.access_token);

        let config = error.config;
        config.headers.Authorization = `Bearer ${response.data.access_token}`

        return new Promise((resolve, reject) => {
            axiosInstance.request(config)
            .then(orig_response => {
                resolve(orig_response);
            }).catch(orig_error => reject(orig_error));
        });
    }).catch(error => Promise.reject(error));
})

export default axiosInstance;