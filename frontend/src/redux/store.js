import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice"
import bookListSliceReducer from "./slices/bookListSlice"
import bookSliceReducer from "./slices/bookSlice"
import cartSliceReducer from "./slices/cartSlice"

export const store = configureStore({
    reducer: {
        books: bookListSliceReducer,
        book: bookSliceReducer,
        user: authSliceReducer,
        cart: cartSliceReducer
    }
})
