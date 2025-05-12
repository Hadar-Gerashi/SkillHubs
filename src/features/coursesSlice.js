import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    arr: null
}

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.arr = action.payload;
        }
    }
})



export const { setCourses } = coursesSlice.actions
export default coursesSlice.reducer


