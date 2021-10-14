import axios from "axios";

const API_URL = "https://medical-ecom-2021.herokuapp.com:443/"
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const getLocalToken = localStorage.getItem('accessToken');
    if (getLocalToken) {
      config.headers.Authorization = `Bearer ${getLocalToken}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
  
    return response;
  }, function (error) {
   
    
    return Promise.reject(error);
  });

export default axiosClient;
