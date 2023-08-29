import { createSlice } from "@reduxjs/toolkit";
const UserSlice=createSlice({
    name:"user",
    initialState:[],
    reducers:{
        showUser(state,action)
        {
            console.log(action.payload)
            state=action.payload
            return state
        }
    }
})
export default UserSlice.reducer
export const {showUser}=UserSlice.actions