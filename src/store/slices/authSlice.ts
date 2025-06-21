import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth } from '../../models';

interface AuthState {
  auth: Auth | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  auth: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state.auth = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.auth = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;