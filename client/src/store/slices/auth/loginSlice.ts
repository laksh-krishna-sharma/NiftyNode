import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast, Id } from 'react-toastify';
import api from '../../api';

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  toastId: Id | null;
}

const initialState: LoginState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
  toastId: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Store token in localStorage
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message ||
        'Login failed';
      return rejectWithValue(message);
    }
  }
);

const loginData = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
      if (state.toastId) {
        toast.dismiss(state.toastId);
        state.toastId = null;
      }
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (state.toastId) {
        toast.dismiss(state.toastId);
        state.toastId = null;
      }
      localStorage.removeItem('token');
      toast.info('You have been logged out.');
    },
    setAuthFromStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        if (state.toastId) {
          toast.dismiss(state.toastId);
        }
        state.toastId = toast.loading('Signing you in...');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        if (state.toastId) {
          toast.update(state.toastId, {
            render: 'Signed in successfully! Redirecting...',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          });
          state.toastId = null;
        } else {
          toast.success('Signed in successfully!');
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        if (state.toastId) {
          toast.update(state.toastId, {
            render: state.error,
            type: 'error',
            isLoading: false,
            autoClose: 4000,
          });
          state.toastId = null;
        } else {
          toast.error(state.error);
        }
      });
  },
});

export const { resetLoginState, clearLoginError, logout, setAuthFromStorage } = loginData.actions;
export default loginData.reducer;