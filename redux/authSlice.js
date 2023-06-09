import { createSlice } from "@reduxjs/toolkit";

const initialStateAuth = {
  userId: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    updateUserInfo: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),
    onAuthorizationUser: (state, { payload }) => ({
      ...state,
      isAuthorized: payload.isAuthorized,
    }),
    offAuthorizationUser: () => initialStateAuth,
    updateAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.userAvatar,
    }),
  },
});

export const {
  updateUserInfo,
  onAuthorizationUser,
  offAuthorizationUser,
  updateAvatar,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
