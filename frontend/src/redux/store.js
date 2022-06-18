import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        text: searchReducer,
        user: authReducer
    }
})