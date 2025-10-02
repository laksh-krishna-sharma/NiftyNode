import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast, Id } from 'react-toastify';
import api from '../../api';
import { loginUser } from './loginSlice';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface SignUpState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  toastId: Id | null;
}

const initialState: SignUpState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isSuccess: false,
  toastId: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterData,
  { rejectValue: string }
>(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store token in localStorage
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      dispatch(loginUser({ email: userData.email, password: userData.password }));
      
      return response.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message ||
        'Registration failed';
      return rejectWithValue(message);
    }
  }
);

const signUpData = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    resetSignUpState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      if (state.toastId) {
        toast.dismiss(state.toastId);
        state.toastId = null;
      }
    },
    clearSignUpError: (state) => {
      state.error = null;
    },
    signUpLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isSuccess = false;
      if (state.toastId) {
        toast.dismiss(state.toastId);
        state.toastId = null;
      }
      localStorage.removeItem('token');
      toast.info('You have been logged out.');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
        if (state.toastId) {
          toast.dismiss(state.toastId);
        }
        state.toastId = toast.loading('Creating your account...');
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSuccess = true;
        state.error = null;
        if (state.toastId) {
          toast.update(state.toastId, {
            render: 'Account created successfully! Signing you in...',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          });
          state.toastId = null;
        } else {
          toast.success('Account created successfully! Signing you in...');
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
        state.isSuccess = false;
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

export const { resetSignUpState, clearSignUpError, signUpLogout } = signUpData.actions;
export default signUpData.reducer;