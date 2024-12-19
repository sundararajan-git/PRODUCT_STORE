import { createSlice } from "@reduxjs/toolkit"

const state = {
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    }
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer