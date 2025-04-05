import dictionary from '@data/dictionary.json';
import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    lang: { ...dictionary },
    projects: [],
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setLanguage, setProjects } = contentSlice.actions;

export default contentSlice.reducer;
