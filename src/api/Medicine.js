import axiosClient from "../axios";


export const getAllMedicine = ()=>{
    return axiosClient.get('/nhathuoc');
}

export const updateMedicine = (body)=>{
    return axiosClient.put('/nhathuoc',body);
}

export const deleteMedicine = (id)=>{
    return axiosClient.delete(`/nhathuoc/${id}`);
}
export const insertMedicine = (body)=>{
    return axiosClient.post('/register' , body)
}