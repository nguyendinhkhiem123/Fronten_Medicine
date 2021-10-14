import axiosClient from "../axios";


export const getUser = (username)=>{
    return axiosClient.get(`/nhanvien/${username}`);
}

export const updateUser = (body)=>{
    return axiosClient.put('/nhanvien',body);
}

export const getAllEmployee = ()=>{
    return axiosClient.get('/nhanvien');
}

export const insertEmployee = (body)=>{
    return axiosClient.post('/nhanvien', body);
}

export const deleteEmployee = (id)=>{
    return axiosClient.delete(`/nhanvien/${id}`);
}