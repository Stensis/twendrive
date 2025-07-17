// src/redux/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type User = {
  avatar: string;
  firstName: string;
  lastName: string;
  userName: string | number | readonly string[];
  phone: string | number | readonly string[];
  id: number;
  name: string;
  email: string;
  role: 'car_owner' | 'car_renter' | 'admin'; // Adjust if needed
};

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
