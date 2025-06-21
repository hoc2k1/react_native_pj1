import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Bật Redux DevTools trong môi trường phát triển
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store