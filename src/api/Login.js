import AxiosClient from '../axios';


export const loginAPI = (body)=>{
    return AxiosClient.post('login' , body);
}

