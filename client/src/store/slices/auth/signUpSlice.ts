import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

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
}

const initialState: SignUpState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterData,
  { rejectValue: string }
>(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store token in localStorage
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
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
    },
    clearSignUpError: (state) => {
      state.error = null;
    },
    signUpLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isSuccess = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
        state.isSuccess = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetSignUpState, clearSignUpError, signUpLogout } = signUpData.actions;
export default signUpData.reducer;