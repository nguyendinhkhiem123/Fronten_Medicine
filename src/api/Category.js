import axiosClient from "../axios";


export const getListCategory = ()=>{
    return axiosClient.get(`/danhmuc`);
}

export const getCodeLast = ()=>{
    return axiosClient.get(`/danhmuc/last`);
}

export const insertCategory = (body)=>{
    return axiosClient.post(`/danhmuc`,body);
}

export const updateCategory = (body)=>{
    return axiosClient.put(`/danhmuc`,body);
}
export const deleteCategory = (id)=>{
    return axiosClient.delete(`/danhmuc/${id}`);
}
