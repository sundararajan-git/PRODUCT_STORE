import { createSlice } from "@reduxjs/toolkit"

const state = {
    _id: null,
    email: null,
    name: null,
    profilePicture: null,
    isVerfied: null,
    createdAt: null,
    updatedAt: null,
    lastLogin: null
}

export const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {
        updateUser: (state, action) => {
            state = { ...state, ...action.payload };
        },
    }
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer