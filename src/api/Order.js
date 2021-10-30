
import axiosClient from "../axios";


export const getListOrder = ()=>{
    return axiosClient.get('/donhang');
}

export const cancleOrder = (madh,manv)=>{
    return axiosClient.put(`/donhang/${madh}?manv=${manv}`)
}

export const updateStatusOrder = (madh , manv)=>{
    return axiosClient.put(`/donhang/ctt/${madh}?manv=${manv}`)
}

export const InsertOrder = (mant , body)=>{
    return axiosClient.post(`/donhang/${mant}/${1}?paymentCreated=''`,body)
}