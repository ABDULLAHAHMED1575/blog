import {createSlice} from "@reduxjs/toolkit"

const userInitialState = {userInfo:null}
const userSlice = createSlice({
    name:"user",
    initialState:userInitialState,
    reducers:{
        setUserInfo(state,action){
            state.userInfo = action.payload;
        },
        resetUserInfo(state,action){
            state.userInfo = null;
        },
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;