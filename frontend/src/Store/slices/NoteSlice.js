import { createSlice } from "@reduxjs/toolkit";
const NoteSlice=createSlice({
    name:"note",
    initialState:[],
    reducers:{
        fetchAllNotes(state,action){
            state=action.payload
            console.log(state)
            return state
        },
    }
})
export default NoteSlice.reducer
export const {fetchAllNotes}=NoteSlice.actions