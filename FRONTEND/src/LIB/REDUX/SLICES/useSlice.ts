import { createSlice } from "@reduxjs/toolkit"

const state = {
    _id: null,
    email: null,
    name: null,
    profilePicture: null,
    isVerified: null,
    createdAt: null,
    updatedAt: null,
    lastLogin: null
}

export const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {
        updateUser: (state, action) => {
            console.log(action)
            state = { ...state, ...action.payload };
            console.log(state)
        },
    }
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer