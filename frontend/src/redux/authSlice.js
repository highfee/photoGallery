import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))
export const authSlice = createSlice({
    name: 'user',
    initialState: {
        value: user ? user : null 
    },
    reducers:{
        update2: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { update2 } = authSlice.actions
export default authSlice.reducer

