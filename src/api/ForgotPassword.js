import axiosClient from "../axios";

export const forgotPassword = (body)=>{
    return axiosClient.post('/mail/sendingemail/nv',body)
}