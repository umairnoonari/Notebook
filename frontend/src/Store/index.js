import { configureStore } from "@reduxjs/toolkit";
import NoteSlice from "./slices/NoteSlice";
import UserSlice from "./slices/UserSlice";
const store=configureStore({
    reducer:{
        notes:NoteSlice,
        User:UserSlice
    }
})
export default store