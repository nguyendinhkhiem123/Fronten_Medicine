import axiosClient from "../axios";


export const getAllProduct = ()=>{
    return axiosClient.get('sanpham');
}
export const getListOfCategory = (madm)=>{
    return axiosClient.get(`/sanpham/danhmuc/${madm}`);
}

export const getCodeLastProduct = ()=>{
    return axiosClient.get(`/sanpham/last`);
}

export const insertProduct = (body)=>{
    return axiosClient.post(`/sanpham`,body);
}

export const updateProduct = (body)=>{
    return axiosClient.put(`/sanpham`,body);
}
export const deleteProduct = (id)=>{
    return axiosClient.delete(`/sanpham/${id}`);
}