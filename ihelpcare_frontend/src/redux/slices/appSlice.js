import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    timeZone: 'UTC+6',
    reFetchData: false,
    isLoading: false,
    isError: null,
    theme: 'light',
  },
  reducers: {
    setTimeZone: (state, action) => {
      state.timeZone = action.payload;
    },
    setReFetchData: (state) => {
      state.reFetchData = !state.reFetchData;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setTheme: (state, action) => {
      switch (action.payload) {
        case 'light':
          document.documentElement.classList.remove('dark');
          state.theme = action.payload;
          break;
        case 'dark':
          document.documentElement.classList.add('dark');
          state.theme = action.payload;
          break;
        default:
          break;
      }
    },
  },
});

export const { setTimeZone, setReFetchData, setIsLoading, setIsError, setTheme } = appSlice.actions;

export default appSlice.reducer;
