import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    accessToken: null,
    refreshToken: null,
    rememberMe: false,
    isLoginUser: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoginUser = true;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    updateUserDataKeyAgainstValue: (state, action) => {
      let data = state.userData;
      data = { ...data, [action.payload.key]: action.payload.value };
      state.userData = data;
    },
    deleteAuthStorage: (state) => {
      state.userData = {};
      state.accessToken = null;
      state.refreshToken = null;
      state.rememberMe = false;
      state.isLoginUser = false;
    },
  },
});

export const {
  setUserData,
  setAccessToken,
  setRefreshToken,
  setRememberMe,
  updateUserDataKeyAgainstValue,
  deleteAuthStorage,
} = authSlice.actions;

export default authSlice.reducer;
