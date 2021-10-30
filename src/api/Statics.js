import axiosClient from "../axios"

export const getStaticsFromTo = (from , to)=>{
    return axiosClient.get(`doanhthu/${from}/${to}`)
}

export const getStaticsYear = (from )=>{
    return axiosClient.get(`doanhthu/${from}`)
}

export const getStaticsImportFromTo = (from , to)=>{
    return axiosClient.get(`phinhap/${from}/${to}`)
}

export const getStaticsImportYear = (from )=>{
    return axiosClient.get(`phinhap/${from}`)
}



export const getStatusOrder = (from , to)=>{
    return axiosClient.get(`doanhthu/trangthai/${from}/${to}`)
}


export const getTopProductOrder = (number)=>{
    return axiosClient.get(`topsp/${number}`)
}


export const getTopProductImport = (number)=>{
    return axiosClient.get(`topsp/import/${number}`)
}

