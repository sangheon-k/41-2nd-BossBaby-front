import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popup: '',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPopups: (state, action) => {
      state.popup = action.payload;
    },
  },
});

export const { setPopups } = commonSlice.actions;
export default commonSlice.reducer;
