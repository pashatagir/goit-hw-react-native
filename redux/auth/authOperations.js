import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSlice } from './authSlice';

const { updateUserProfile, updateUserAvatar, logoutUser } = authSlice.actions;

export const authRegister =
  ({ userName, userEmail, password, avatar }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: avatar,
      });

      const { uid, displayName, email, photoURL } = auth.currentUser;

      await AsyncStorage.setItem('auth_email', email);
      await AsyncStorage.setItem('auth_password', password);

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
          isCurrentUser: true,
        })
      );
    } catch (error) {
      return error.message;
    }
  };

export const authLogin =
  ({ userEmail, password }) =>
  async dispatch => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      const { displayName, email, photoURL, uid } = user;

      await AsyncStorage.setItem('auth_email', user.email);
      await AsyncStorage.setItem('auth_password', password);

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          avatar: photoURL,
          isCurrentUser: true,
        })
      );

      return { user };
    } catch (error) {
      console.log(error.message);

      return error.message;
    }
  };

export const authUpdateStatus = () => async dispatch => {
  try {
    const authEmail = await AsyncStorage.getItem('auth_email');
    const authPassword = await AsyncStorage.getItem('auth_password');

    const userData = { userEmail: authEmail, password: authPassword };

    if (userData.userEmail) {
      try {
        await dispatch(authLogin(userData));
      } catch (error) {
        console.log('Sorry, this user was deleted');
        return error.message;
      }
    }
  } catch (error) {
    return error.message;
  }
};

export const authLogout = () => async dispatch => {
  try {
    await signOut(auth);
    dispatch(logoutUser());
    await AsyncStorage.removeItem('auth_email');
    await AsyncStorage.removeItem('auth_password');
  } catch (error) {
    return error.message;
  }
};
