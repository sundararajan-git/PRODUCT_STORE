import { createSlice } from "@reduxjs/toolkit"

// initila state 
const state: any = {
    _id: null,
    email: null,
    name: null,
    profilePicture: null,
    isVerified: null,
    createdAt: null,
    updatedAt: null,
    lastLogin: null
}

const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {
        // update the user
        updateUser: (state, action) => {
            Object.assign(state, action.payload);
        },
    }
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer