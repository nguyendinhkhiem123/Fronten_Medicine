import { createSlice } from "@reduxjs/toolkit";


const category =  createSlice({
    name : 'category',
    initialState: [],
    reducers:{
        addListCategory : ( state , payload )=>{
            return payload.payload;
        },
        removeListCategory : (state , payload )=>{
            return  [];
        }
    }
})

const { actions  , reducer } = category;

export const { addListCategory ,  removeListCategory } = actions;

export default reducer;