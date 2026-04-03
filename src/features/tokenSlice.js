import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:''
}

const tokenSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        store: (state,action) =>{
            state.value = action.payload;
        },
        remove: (state) =>{
            state.value = ''
        }
    }
})

export const {store,remove} = tokenSlice.actions;

export default tokenSlice.reducer;