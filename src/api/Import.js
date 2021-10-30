import axiosClient from "../axios";


export const getOneImportMedicine = (mapn)=>{
    return axiosClient.get(`phieunhap/${mapn}`)
}

export const getImportMedicine = ()=>{
    return axiosClient.get('phieunhap')
}

export const updateImportMedicine = (body)=>{
    return axiosClient.put('phieunhap',body)
}

export const insertImportMedicine = (body,manv)=>{
    return axiosClient.post(`phieunhap/${manv}`,body)
}

export const deleteImportMedicine = (mapn)=>{
    return axiosClient.delete(`phieunhap/${mapn}`)
}

export const cancleImportMedicine = (mapn,manv)=>{
    return axiosClient.put(`phieunhap/${mapn}?manv=${manv}`)
}

export const updateStatusImportMedicine = (mapn,manv)=>{
    return axiosClient.put(`phieunhap/ctt/${mapn}?manv=${manv}`)
}

export const getDetailImport = (mapn)=>{
    return axiosClient.get(`ctpn/${mapn}`)
}