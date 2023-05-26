import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  avatar: null,
  isCurrentUser: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      const { userId, userName, userEmail, avatar, isCurrentUser } = payload;
      return { ...state, userId, userName, userEmail, avatar, isCurrentUser };
    },
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
    logoutUser: () => initialState,
  },
});
