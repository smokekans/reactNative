import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import {
  updateUserInfo,
  onAuthorizationUser,
  offAuthorizationUser,
} from "./authSlice";
import { updateAvatar } from "./authSlice";

export const authSignUp = ({ username, email, password }) => {
  async (dispatch, getState) => {
    try {
      const avatar = getState().auth.userAvatar;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user", userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: username,
        photoURL: avatar,
      });

      const { displayName, photoURL, uid } = userCredential.user;
      const userEmail = auth.currentUser.email;

      const createUserProfile = {
        userName: displayName,
        userId: uid,
        userEmail: userEmail,
        userAvatar: photoURL,
      };

      console.log("createUserProfile =>", createUserProfile);

      dispatch(updateUserInfo(createUserProfile));
    } catch (error) {
      alert(error.message);
    }
  };
};

export const authSignIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user =>", userCredential.user);

      const { uid, displayName, photoURL } = userCredential.user;
      dispatch(
        updateUserInfo({
          userId: uid,
          userName: displayName,
          userEmail: email,
          userAvatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == "auth/invalid-password") {
        alert("Надане значення пароля невірне. Спробуйте ще раз.");
      }
      if (errorCode == "auth/user-not-found") {
        alert(
          "Немає існуючого запису користувача, що відповідає наданій електронній пошті."
        );
      } else {
        alert(errorMessage);
      }
    }
  };

export const authSignOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(offAuthorizationUser());
  } catch (error) {
    alert("Error", error.message);
  }
};

export const authorizationUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        const userUpdateProfile = {
          userName: displayName,
          userId: uid,
          userEmail: email,
          userAvatar: photoURL,
        };
        dispatch(onAuthorizationUser({ isAuthorized: true }));
        dispatch(updateUserInfo(userUpdateProfile));
      }
    } catch (error) {
      alert(error.code, error.message);
      signOut(auth);
      dispatch(offAuthorizationUser);
    }
  });
};

export const changeAvatar = (processedAvatarURL) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    await updateUserInfo(user, {
      photoURL: processedAvatarURL,
    });
  }
  dispatch(updateAvatar({ userAvatar: processedAvatarURL }));
};
