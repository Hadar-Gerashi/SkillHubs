import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        },
        userOut: (state) => {
            state.currentUser = null;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
        }
    }
})



export const { userIn, userOut } = userSlice.actions
export default userSlice.reducer


