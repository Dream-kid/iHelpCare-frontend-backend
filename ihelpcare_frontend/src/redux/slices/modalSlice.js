import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    signInUpModal: {
      open: false,
      tab: 'sign-in',
    },
    forgotPasswordModalOpen: false,
    resetPasswordModalOpen: false,
    changePasswordModalOpen: false,
  },
  reducers: {
    setSignInUpModal: (state, action) => {
      state.signInUpModal.open = action.payload.open;
      state.signInUpModal.tab = action.payload.tab;
    },
    setForgotPasswordModalOpen: (state, action) => {
      state.forgotPasswordModalOpen = action.payload;
    },
    setResetPasswordModalOpen: (state, action) => {
      state.resetPasswordModalOpen = action.payload;
    },
    setChangePasswordModalOpen: (state, action) => {
      state.changePasswordModalOpen = action.payload;
    },
  },
});

export const {
  setSignInUpModal,
  setForgotPasswordModalOpen,
  setResetPasswordModalOpen,
  setChangePasswordModalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
