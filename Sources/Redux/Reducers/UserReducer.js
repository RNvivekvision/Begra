import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  User: null,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { setUser } = UserReducer.actions;

export default UserReducer.reducer;
