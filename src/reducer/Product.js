import { createSlice } from "@reduxjs/toolkit";


const product =  createSlice({
    name : 'product',
    initialState: [],
    reducers:{
        addListProduct : ( state , payload )=>{
            return payload.payload;
        },
        removeListProduct : (state , payload )=>{
            return  [];
        }
    }
})

const { actions  , reducer } = product;

export const { addListProduct ,  removeListProduct } = actions;

export default reducer;