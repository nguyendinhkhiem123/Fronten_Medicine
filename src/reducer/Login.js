import { createSlice } from "@reduxjs/toolkit";


const isLogin =  createSlice({
    name : 'login',
    initialState: true,
    reducers:{
        login : ( state , payload )=>{
            return true;
        },
        removeLogin : (state , payload )=>{
            return  false;
        }
    }
})

const { actions  , reducer } = isLogin;

export const { login ,  removeLogin } = actions;

export default reducer;