import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

import { postSlice } from './postSlice';
const { updatePosts, updateLikes, updateComments, updateCountComments } =
  postSlice.actions;

export const uploadPostToServer = post => async (_, getState) => {
  const { userId } = getState().auth;
  try {
    await addDoc(collection(db, 'posts'), {
      ...post,
      userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const allPosts = [];
    querySnapshot.forEach(doc =>
      allPosts.push({ ...doc.data(), idPost: doc.id })
    );

    dispatch(updatePosts(allPosts));
    return allPosts;
  } catch (error) {
    console.log(error.message);
  }
};

export const changeLikes = idPost => async dispatch => {
  try {
    const postRef = doc(db, 'posts', idPost);
    const countLikes = (await getDoc(postRef)).data().likes;

    await updateDoc(postRef, {
      likes: countLikes + 1,
    });

    dispatch(updateLikes({ id: idPost, likes: countLikes + 1 }));
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadComments = comment => async (_, getState) => {
  const { userId } = getState().auth;

  try {
    await addDoc(collection(db, 'comments'), {
      ...comment,
      userId,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentsByPostId = idPost => async dispatch => {
  try {
    const q = query(collection(db, 'comments'), where('idPost', '==', idPost));
    const querySnapshot = await getDocs(q);
    const allComments = [];
    querySnapshot.forEach(doc => allComments.push(doc.data()));

    const postRef = doc(db, 'posts', idPost);
    await updateDoc(postRef, {
      countComments: allComments.length,
    });

    dispatch(updateComments(allComments));
    dispatch(
      updateCountComments({
        id: idPost,
        countComments: allComments.length,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
