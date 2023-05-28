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
const { updatePosts, updateLikes, updateComments, updateCommentsCount } =
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
      allPosts.push({ ...doc.data(), postId: doc.id })
    );

    dispatch(updatePosts(allPosts));
    return allPosts;
  } catch (error) {
    console.log(error.message);
  }
};

export const changeLikes = postId => async dispatch => {
  try {
    const postRef = doc(db, 'posts', postId);
    const likes = (await getDoc(postRef)).data().likes;

    await updateDoc(postRef, {
      likes: likes + 1,
    });

    dispatch(updateLikes({ id: postId, likes: likes + 1 }));
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

export const getCommentsByPostId = postId => async dispatch => {
  try {
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    const allComments = [];
    querySnapshot.forEach(doc =>
      allComments.push({ ...doc.data(), postId: doc.id })
    );

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentsCount: allComments.length,
    });

    dispatch(updateComments(allComments));
    dispatch(
      updateCommentsCount({
        id: postId,
        commentsCount: allComments.length,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};
